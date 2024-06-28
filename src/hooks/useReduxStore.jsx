import React from "react";
import { useSelector } from "react-redux";

const useReduxStore = () => {
  const auth = useSelector((state) => state.auth);

  return { auth };
};

export default useReduxStore;
