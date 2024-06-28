import React, { useState } from "react";

const Password = ({ name, placeholder, label, ...rest }) => {
  const [shwoPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label || "Password"}
        </label>
      </div>
      <div className="mt-2 relative ">
        <input
          name={name}
          type={shwoPassword ? "text" : "password"}
          placeholder={placeholder || "Enter your password..."}
          {...rest}
          className=" block w-full rounded-md border-1 py-3 px-4 text-gray-900 shadow-sm  placeholder:text-gray-400 border border-gray-300 focus:outline-none sm:text-sm sm:leading-6"
        />
        <div
          className="absolute right-2 top-[30%] cursor-pointer"
          onClick={() => setShowPassword(!shwoPassword)}
        >
          {shwoPassword ? (
            <i className="fa-regular fa-eye-slash"></i>
          ) : (
            <i className="fa-regular fa-eye"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Password;
