import React from "react";
import { Link, useLocation } from "react-router-dom";
import useReduxStore from "../../hooks/useReduxStore";
import useStoreAuth from "../../hooks/useStoreAuth";

const Navbar = () => {
  const { auth } = useReduxStore();
  const location = useLocation();
  const { logoutSuccess, dispatch } = useStoreAuth();
  const handleLogout = () => {
    dispatch(logoutSuccess());
  };

  return (
    <div className="bg-gray-800 py-6 px-4 font-inter fixed top-0 w-full z-[1000] ">
      <nav className="max-w-[1176px] mx-auto  text-white flex items-center justify-between">
        <Link className="font-bold text-xl tracking-tight" to="/">
          Social Echo
        </Link>
        <div className="flex items-center">
          <Link
            className={`font-semibold text-base px-4 py-2 leading-none rounded-full hover:bg-gray-700 bg-gray-700`}
            to="/add-post"
          >
            Add Post +
          </Link>

          {auth.isAuthenticated ? (
            <>
              <Link
                className={`text-base px-4 py-2 leading-none rounded-full hover:bg-gray-700 `}
                to="/profile"
              >
                Profile
              </Link>
              <button
                onClick={() => handleLogout()}
                className={`text-base px-4 py-2 leading-none rounded-full hover:bg-gray-700 `}
              >
                Logout
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
