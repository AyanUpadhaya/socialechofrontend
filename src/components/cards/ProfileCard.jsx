import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base_url, imageUploadApi } from "../../utils/api";
import useReduxStore from "../../hooks/useReduxStore";
import axios from "axios";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import RequestLoader from "../loaders/RequestLoader";
import { useNavigate } from "react-router-dom";
import ProfessionCard from "./ProfessionCard";

const ProfileCard = ({ userId, user, isCurrentUser }) => {
  const { auth } = useReduxStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  //fetch uploaded img url
  const fetchImageData = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
    setImgLoading(true);

    const res = await fetch(imageUploadApi, {
      method: "POST",
      body: data,
    });
    const res_data = await res.json();
    if (res_data.version_id) {
      setImgUrl(res_data.url);
      setImgLoading(false);
      return res_data;
    } else {
      setImgLoading(false);
    }
  };
  //user info update common mutation
  const userUpdate = async (postData) => {
    try {
      const response = await axios.put(
        `${base_url}/user/update/${userId}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      infoNotify(response.data.message);
    } catch (error) {
      infoNotify(error.response.data.message);
      throw new Error(error.response.data.message);
    }
  };
  //tanstack mutation
  const { mutate: updateUserInfo, isLoading: isUserUpdating } = useMutation({
    mutationFn: userUpdate,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });
  //delete
  const deleteProfession = async ({ userId, professionId }) => {
    try {
      const response = await axios.delete(
        `${base_url}/users/${userId}/professions/${professionId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      infoNotify(response.data.message);
    } catch (error) {
      console.error("Error deleting profession:", error);
      errorNotify(error.response.data.message);
    }
  };
  const { mutate: deleteUserProfession, isLoading: isDeleteRequestLoading } =
    useMutation({
      mutationFn: deleteProfession,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ["profileData"] });
      },
    });
  //handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const isAllowed = setExtention(file?.name);

    if (isAllowed) {
      // Read the selected file and create a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setFile(file);
      errorNotify("Invalid file type");
    }
  };
  //validate image type
  const setExtention = (fileName) => {
    const allowedExtensions = ["jpg", "jpeg", "png"];
    if (fileName) {
      const fileExtension = fileName?.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        return true;
      } else {
        return false;
      }
    }
  };
  //handle update picuter
  const handleUpdatePicture = async () => {
    //click button
    if (!file) {
      errorNotify("No file selected");
      return;
    }

    //make get image url request
    const newImgUrl = await fetchImageData(file);
    if (newImgUrl?.version_id) {
      const postData = {
        name: user.name,
        email: user.email,
        imgUrl: newImgUrl?.url,
      };
      updateUserInfo(postData);
    } else {
      errorNotify("Something went wrong");
    }

    //send request to backend to update the profile with updated image data
    return;
  };

  //handle work info add

  return (
    <div className=" bg-white  rounded-xl overflow-hidden">
      <div className="flex flex-col flex-wrap sm:flex-row gap-6 p-4">
        <div className="shrink-0  w-[350px]   ">
          {/* image preview */}
          <div className="w-full bg-base-300 py-4 border rounded-md">
            <div className="relative top-0 max-w-max mx-auto ">
              <div className="w-48 h-48 rounded-full  ">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt=""
                    className="w-48 h-48 object-cover rounded-full border-4 border-[#FAF7F5]"
                  />
                ) : (
                  <img
                    src={user?.imgUrl}
                    className="w-48 h-48 object-cover rounded-full border-4 border-[#FAF7F5]"
                  ></img>
                )}
              </div>

              <label
                htmlFor="selectImage"
                className="w-10 h-10 cursor-pointer flex justify-center items-center rounded-full bg-slateLow absolute right-0 bottom-5"
              >
                <i
                  className="fa-solid fa-camera text-2xl"
                  style={{ color: "#515EDB" }}
                ></i>
              </label>
              <input
                type="file"
                id="selectImage"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="btn-cs-primary"
                onClick={() => handleUpdatePicture()}
              >
                Update Image
              </button>
            </div>
            <div className="mt-2 text-gray-600 flex justify-center">
              {user?.email}
            </div>
          </div>
        </div>

        <div className="flex-1 ">
          <div className="mt-2 mb-4 text-gray-900 text-3xl font-bold">
            {user?.name}
          </div>
          <div className="mt-2 text-gray-600 flex flex-wrap gap-2 justify-start mb-4">
            <div className="font-semibold">
              Followers: {user?.followers?.length}
            </div>
            <div className="font-semibold">
              Following: {user?.following?.length}
            </div>
          </div>

          <div>
            <div className="flex justify-between flex-wrap">
              <h3 className="text-xl font-bold">Work info & Experience</h3>
              <button
                onClick={() =>
                  navigate("/dashboard/add-work-info", {
                    state: {
                      userId: userId,
                    },
                  })
                }
                className="btn-cs-primary"
              >
                Add info +
              </button>
            </div>
            <div className="my-4">
              {user?.professions.length > 0 ? (
                user?.professions.map((profession) => (
                  <ProfessionCard
                    key={profession._id}
                    profession={profession}
                    deleteUserProfession={deleteUserProfession}
                    userId={userId}
                  ></ProfessionCard>
                ))
              ) : (
                <p className="text-gray-700">No professions added yet.</p>
              )}
            </div>

            <div className="flex justify-between flex-wrap">
              <h3 className="text-xl font-bold">About or Bio</h3>
              <button
                onClick={() =>
                  navigate("/dashboard/update-about", {
                    state: {
                      userId: userId,
                      payload: {
                        about: user.about,
                      },
                    },
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 23.001H4C2.9 23.001 2 22.101 2 21.001C2 19.901 2.9 19.001 4 19.001H20C21.1 19.001 22 19.901 22 21.001C22 22.101 21.1 23.001 20 23.001ZM13.06 4.19104L16.81 7.94103L8.04 16.711C7.86 16.901 7.6 17.001 7.34 17.001H5C4.45 17.001 4 16.551 4 16.001V13.661C4 13.391 4.11 13.141 4.29 12.951L13.06 4.19104ZM17.88 6.87104L14.13 3.12104L15.96 1.29104C16.35 0.901035 16.98 0.901035 17.37 1.29104L19.71 3.63104C20.1 4.02104 20.1 4.65104 19.71 5.04104L17.88 6.87104Z"
                    fill="#03BBBE"
                  />
                </svg>
              </button>
            </div>
            <div className="">
              {user.about ? (
                <div className="whitespace-pre-wrap">{user.about}</div>
              ) : (
                <p className="text-gray-700">No bio added yet.</p>
              )}
            </div>
          </div>

          {!isCurrentUser && (
            <div className="md:flex gap-4">
              <div className="mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Follow
                </button>
              </div>
              <div className="mt-4">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {(isUserUpdating || imgLoading || isDeleteRequestLoading) && (
        <RequestLoader />
      )}
    </div>
  );
};

export default ProfileCard;
