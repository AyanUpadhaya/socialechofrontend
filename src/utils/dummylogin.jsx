import { Navigate, useNavigate } from "react-router-dom";
import { loginSuccess } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

import React from "react";

export default function Dummylogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    const response = {
      email: "example@example.com",
      _id: "user_id",
      token: "jwt_token",
    };
    dispatch(loginSuccess(response));
    navigate('/');
  };
  return <></>;
}
