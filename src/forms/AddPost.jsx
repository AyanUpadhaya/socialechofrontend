import React from "react";
import { errorNotify, infoNotify } from "../utils/getNotify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useReduxStore from "../hooks/useReduxStore";
import RequestLoader from "../components/loaders/RequestLoader";
import { base_url } from "../utils/api";
import { useNavigate } from "react-router-dom";
const AddPost = () => {
  const queryClient = useQueryClient();
  const { auth } = useReduxStore();
  const navigate = useNavigate();
  const postAddMutation = async (data) => {
    try {
      const response = await axios.post(`${base_url}/post/create`, data, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      infoNotify(response.data.message);
      return response.data;
    } catch (error) {
      errorNotify(error.data.message);
      console.log(error);
    }
  };

  const { mutate: addPost, isLoading: isPostRequesting } = useMutation({
    mutationFn: postAddMutation,
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["allposts"] });
    },
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const photourl = form.photourl.value;

    try {
      const myPost = {
        title: title,
        content: description,
        author: auth?.user?._id,
        picture: photourl,
      };
      addPost(myPost);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
  return (
    <div className="bg-base-300 pt-[100px]">
      <div className="max-w-[1176px] mx-auto space-y-6">
        <div className="flex-1 h-[calc(100%-20px)] relative no-scrollbar overflow-auto p-4">
          <div className="p-4 rounded-xl bg-white">
            <div className="mb-6">
              <h2 className="text-gray-900 font-semibold text-3xl">Add Post</h2>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 font-semibold">
                  Title (Required)
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Add title"
                  className="p-3 w-full rounded-xl border border-gray-300 focus:outline-0"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 font-semibold">
                  Photo (Not required)
                </label>
                <input
                  type="text"
                  name="photourl"
                  placeholder="Enter photo url"
                  className="p-3 w-full rounded-xl border border-gray-300 focus:outline-0"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 font-semibold">
                  Description (Required)
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  className="w-full h-[200px] p-3 rounded-xl border border-gray-300 focus:outline-0"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  disabled={isPostRequesting}
                  type="submit"
                  className="py-2 px-5 w-[196px] cursor-pointer rounded-lg bg-gray-900 text-white font-medium"
                >
                  {isPostRequesting ? (
                    <span className="loading loading-dots loading-md"></span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
