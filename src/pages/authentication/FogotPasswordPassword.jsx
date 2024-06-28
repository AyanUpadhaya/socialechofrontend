import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import useReduxStore from "../../hooks/useReduxStore";
import { fogotPasswordRoute } from "../../utils/api";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import { useNavigate } from "react-router-dom";

const FogotPasswordPassword = () => {
  const { postData, isRequesting } = useAxios();
  const navigate = useNavigate();
  const { auth } = useReduxStore();
  let from = location.state?.from?.pathname || "/login";
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [auth]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;

    const data = {
      email: email,
    };

    const handleCustomError = (res) => {
      if (res.status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error(`${res?.data?.message}`);
      }
    };

    try {
      const response = await postData(fogotPasswordRoute, data, {
        type: "forgotPassword",
        customErrorHandler: handleCustomError,
      });
      console.log(response);

      if (response) {
        infoNotify(`${response?.message}`);
        navigate("/login");
      }
    } catch (error) {
      errorNotify(error.message);
    }
  };
  return (
    <div className="h-screen bg-bgImage bg-no-repeat bg-cover flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 font-poppins">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                placeholder="Enter your email.."
                type="text"
                required
                className=" w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm  placeholder:text-gray-400   focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isRequesting}
              className="flex w-full justify-center rounded-md bg-primary py-3 px-4 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isRequesting ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FogotPasswordPassword;
