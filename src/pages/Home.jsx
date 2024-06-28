import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SearchLoader from "../components/loaders/SearchLoader";
import { base_url } from "../utils/api";
import { useEffect, useState } from "react";
import useReduxStore from "../hooks/useReduxStore";
import PostCard from "../components/cards/PostCard/PostCard";
const Home = () => {
  const { auth } = useReduxStore();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/post/all`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error.response?.data?.message || "Failed to fetch data");
      throw new Error(error.response.data.message || "Failed to fetch data");
    }
  };
  const {
    isLoading,
    isError,
    data: posts,
  } = useQuery({
    queryKey: ["allposts"],
    queryFn: fetchData,
  });
  if (isLoading) return <SearchLoader />;
  if (isError) return <>{isError.message}</>;
  
  return (
    <div className="bg-base-300 py-[100px]">
      <div className="max-w-[500px] mx-auto space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            base_url={base_url}
            auth={auth}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
