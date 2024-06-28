import React from "react";
import { Link } from "react-router-dom";

const DashboardSidebar = ({ handleLogout, pathname }) => {
  return (
    <div className="w-64 bg-gray-800 text-white border-r">
      <div className="p-4">
        <Link to="/" className="text-2xl font-bold text-white">Writter</Link>
      </div>
      <nav className="p-2">
        <ul>
          <li className="mb-2">
            <Link
              to="/dashboard"
              className={`block  hover:bg-gray-200 hover:text-gray-800 ${
                pathname == "/dashboard"
                  ? "bg-gray-200 text-gray-800"
                  : "text-white"
              } px-4 py-2 rounded`}
            >
              <i className="fa-solid fa-cube"></i> Home
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/profile"
              className={`block  hover:bg-gray-200 hover:text-gray-800 ${
                pathname == "/dashboard/profile"
                  ? "bg-gray-200 text-gray-800"
                  : "text-white"
              } px-4 py-2 rounded`}
            >
              <i className="fa-solid fa-user"></i> Profile
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/all-users"
              className={`block  hover:bg-gray-200 hover:text-gray-800 ${
                pathname == "/dashboard/all-users"
                  ? "bg-gray-200 text-gray-800"
                  : "text-white"
              } px-4 py-2 rounded`}
            >
              <i className="fa-solid fa-user-group"></i> Users
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/dashboard/all-posts"
              className={`block  hover:bg-gray-200 hover:text-gray-800 ${
                pathname == "/dashboard/all-posts"
                  ? "bg-gray-200 text-gray-800"
                  : "text-white"
              } px-4 py-2 rounded`}
            >
              <i className="fa-solid fa-folder-plus"></i> All Posts
            </Link>
          </li>
          <li className="mb-2 hidden">
            <Link
              to="/dashboard/add-post"
              className={`block  hover:bg-gray-200 hover:text-gray-800 ${
                pathname == "/dashboard/add-post"
                  ? "bg-gray-200 text-gray-800"
                  : "text-white"
              } px-4 py-2 rounded`}
            >
              <i className="fa-solid fa-folder-plus"></i> Add Post
            </Link>
          </li>

          <li
            onClick={handleLogout}
            className="cursor-pointer mb-2 w-full block text-white hover:bg-gray-200 hover:text-gray-800 px-4 py-2 rounded"
          >
            <button className="">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Logoout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
