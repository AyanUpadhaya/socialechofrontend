import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base_url } from "../../utils/api";
import useReduxStore from "../../hooks/useReduxStore";
import axios from "axios";
import { infoNotify } from "../../utils/getNotify";
import ProfessionCard from "../cards/ProfessionCard";

const OtherUserProfileCard = ({ username }) => {
  const { auth } = useReduxStore();
  const loggedInUser =
    typeof auth.user === "string" ? JSON.parse(auth.user) : auth.user;
  const queryClient = useQueryClient();

  const getUserProfile = async () => {
    try {
      const response = await axios.get(`${base_url}/user/find/${username}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // infoNotify(response.data.message);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Failed to fetch user data"
      );
    }
  };

  const followUserProfile = async ({ followId }) => {
    try {
      const response = await axios.put(
        `${base_url}/follow`,
        { followId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      infoNotify(error.response.data.message);
      throw new Error(
        error.response.data.message || "Failed to fetch user data"
      );
    }
  };
  const unfollowUserProfile = async ({ unfollowId }) => {
    try {
      const response = await axios.put(
        `${base_url}/unfollow`,
        { unfollowId },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      infoNotify(response.data.message);
      return response.data;
    } catch (error) {
      infoNotify(error.response.data.message);
      throw new Error(
        error.response.data.message || "Failed to fetch user data"
      );
    }
  };

  const { mutate: followUser, isLoading: followLoading } = useMutation({
    mutationFn: followUserProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["OtherUserprofileData"] });
      infoNotify("You are following");
    },
  });
  const { mutate: unfollowUser, isLoading: unfollowLoading } = useMutation({
    mutationFn: unfollowUserProfile,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["OtherUserprofileData"] });
    },
  });

  const handleFollow = () => {
    followUser({ followId: otherUser._id });
  };
  const handleUnFollow = () => {
    unfollowUser({ unfollowId: otherUser._id });
  };

  const {
    isLoading,
    isError,
    data: otherUser,
  } = useQuery({
    queryKey: ["OtherUserprofileData", username],
    queryFn: getUserProfile,
  });

  if (isLoading) return "Loading...";
  if (isError) return <>{isError.message}</>;

  return (
    <div className=" bg-white p-4 rounded-xl overflow-hidden">
      <div className="md:flex gap-6">
        <div className="md:flex-shrink-0">
          <img
            className="h-[350PX] w-full object-cover md:w-[350px]"
            src={otherUser.imgUrl}
            alt="User Avatar"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="">
            <div className="uppercase hidden tracking-wide text-sm text-indigo-500 font-semibold">
              {otherUser.username}
            </div>
            <div className="mt-2 text-gray-900 text-3xl font-bold">
              {otherUser.name}
            </div>
            <div className="mt-2 text-gray-600">{otherUser.email}</div>
            <div className="mt-2 text-gray-600">
              Followers: {otherUser.followers.length} Following:{" "}
              {otherUser.following.length}
            </div>
            {auth.user._id !== otherUser._id && (
              <div className="md:flex gap-4">
                <div className="mt-4">
                  {otherUser?.followers.includes(loggedInUser._id) ? (
                    <button
                      onClick={handleUnFollow}
                      disabled={followLoading}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      disabled={unfollowLoading}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Follow
                    </button>
                  )}
                </div>
                <div className="mt-4">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Message
                  </button>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="my-4">
              <h3 className="text-lg font-bold">Work info & Experience</h3>
              {otherUser?.professions.length > 0 ? (
                otherUser?.professions.map((profession) => (
                  <ProfessionCard
                    key={profession._id}
                    profession={profession}
                    userId={auth.user._id}
                    showActions={false}
                  ></ProfessionCard>
                ))
              ) : (
                <p className="text-gray-700">No professions added yet.</p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold">About</h3>
            {otherUser.about ? (
              <div className="whitespace-pre-wrap">{otherUser.about}</div>
            ) : (
              <p className="text-gray-700">No bio added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfileCard;
