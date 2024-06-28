import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import FogotPasswordPassword from "../pages/authentication/FogotPasswordPassword";
import ResetPassword from "../pages/authentication/ResetPassword";
import AddPost from "../forms/AddPost";
import UpdatePost from "../forms/UpdatePost";
import Profile from "../pages/Profile";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <Layout></Layout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-post",
        element: <AddPost></AddPost>,
      },
      {
        path: "/update-post",
        element: <UpdatePost></UpdatePost>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgot-password",
    element: <FogotPasswordPassword></FogotPasswordPassword>,
  },
  {
    path: "/reset-password/:tokenId",
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: "*",
    element: (
      <h2 className="font-black py-6 text-3xl text-red-600 text-center">
        Page Not Found!
      </h2>
    ),
  },
]);
