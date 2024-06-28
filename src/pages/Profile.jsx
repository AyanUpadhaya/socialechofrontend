import React, { useEffect, useState } from "react";
import useReduxStore from "../hooks/useReduxStore";
import { base_url } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import SearchLoader from "../components/loaders/SearchLoader";
import axios from "axios";

const Profile = () => {
  const { auth } = useReduxStore();


  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${base_url}/user/profile/${auth?.user?._id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

   const {
     isLoading,
     isError,
     data: profile,
   } = useQuery({
     queryKey: ["proile"],
     queryFn: fetchData,
   });
   if (isLoading) return <SearchLoader />;
   if (isError) return <>{isError.message}</>;
 
  return (
    <div className="bg-base-300 py-[100px] min-h-screen">
      <div className="max-w-[500px] mx-auto space-y-6 ">
        <div className="bg-white p-4">
          <h3 className="font-semibold mb-4 text-3xl">User Profile</h3>
          <p className="font-semibold">Name: {profile?.name}</p>
          <p className="font-semibold">Email: {profile?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
