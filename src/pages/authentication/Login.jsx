import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import Password from "../../components/shared/Password";
import useAxios from "../../hooks/useAxios";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import useStoreAuth from "../../hooks/useStoreAuth";
import { loginRoute } from "../../utils/api";
import { loginSuccess } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { backdrop } from "../../assets/getAssets";
import useReduxStore from "../../hooks/useReduxStore";
const Login = () => {
  const { postData, isRequesting } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useReduxStore();
  let from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();

    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;

    const data = {
      username: username,
      password: password,
    };

    const handleCustomError = (res) => {
      console.log(res);
      if (res.status === 401) {
        throw new Error("Invalid username or password");
      } else {
        throw new Error(`${res?.data?.message}`);
      }
    };

    try {
      const response = await postData(loginRoute, data, {
        type: "login",
        customErrorHandler: handleCustomError,
      });

      if (response) {
        infoNotify("Logged in successfully");
        dispatch(loginSuccess(response));
        navigate(from, { replace: true });
      }
    } catch (error) {
      errorNotify(error.message);
    }
  };
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [auth]);

  return (
    <div className="h-screen bg-bgImage bg-no-repeat bg-cover flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 font-poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <h2 className="mt-3 text-center text-xl font-bold text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                placeholder="Enter your username.."
                type="text"
                required
                className=" w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm  placeholder:text-gray-400   focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Password
              name={"password"}
              placeholder={"Enter your password"}
              label={"Password"}
              required={true}
            ></Password>
          </div>

          <p className="mt-10 text-start text-sm text-gray-500">
            <Link
              to="/forgot-password"
              className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Forgot Password?
            </Link>
          </p>

          <div>
            <button
              type="submit"
              disabled={isRequesting}
              className="flex w-full justify-center rounded-md bg-primary py-3 px-4 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isRequesting ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Dont have an account?
          <Link
            to="/registration"
            className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
