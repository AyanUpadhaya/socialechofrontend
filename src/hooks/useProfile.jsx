import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/profile/profileSlice";
const useProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const { user } = profile;
  return { auth, profile, user, setUser, dispatch };
};

export default useProfile;
