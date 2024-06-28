import React, { useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import useReduxStore from "../../hooks/useReduxStore";
import { fogotPasswordRoute } from "../../utils/api";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import { useNavigate, useParams } from "react-router-dom";
import Password from "../../components/shared/Password";

const ResetPassword = () => {
  const { postData, patchData, isRequesting } = useAxios();
  const navigate = useNavigate();
  const { auth } = useReduxStore();
  let from = location.state?.from?.pathname || "/login";
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [auth]);

  const { tokenId } = useParams();
  console.log(tokenId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    if (password.length < 6) {
      errorNotify("Passwords must be six characters");
      return;
    }
    if (password !== confirmpassword) {
      errorNotify("Passwords don't match");
      return;
    }

    const data = {
      password: password,
    };

    const handleCustomError = (res) => {
      if (res.status === 404) {
        throw new Error(`${res?.data?.message}`);
      } else {
        throw new Error(`${res?.data?.message}`);
      }
    };

    try {
      const response = await patchData(
        `${import.meta.env.VITE_BASE_URL}/user/reset-password/${tokenId}`,
        data,
        {
          type: "forgotPassword",
          customErrorHandler: handleCustomError,
        }
      );
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
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Password
              name={"password"}
              placeholder={"Enter your password"}
              label={"Password"}
              required={true}
            ></Password>
          </div>

          <div>
            <Password
              name={"confirmpassword"}
              placeholder={"Confirm your password"}
              label={"Confirm Password"}
              required={true}
            ></Password>
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

export default ResetPassword;
