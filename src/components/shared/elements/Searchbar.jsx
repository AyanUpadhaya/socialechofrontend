import React from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ title, placeholder, value, onChange,path }) => {
  const navigate = useNavigate()
  return (
    <div className="bg-[#1E293B] text-white w-full flex justify-between items-center">
      <div>
        <h3 className="font-semibold text-base leading-normal py-6 px-4 ">
          {title}
        </h3>
      </div>
      {/* plus */}
      <div className="flex-1 flex-shrink-0 mr-10 flex items-center gap-3 ">
        <div className="flex-1 ">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder || "Type any"}
            className="input input-bordered w-full max-w-md bg-white text-[#2f2f2f] rounded-md"
          />
        </div>
        <button onClick={() => navigate(path)} className="text-4xl">
          <i
            className="fa-solid fa-square-plus  text-white"
            style={{ color: "#ffff" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
