import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const Layout = () => {
  return (
    <main className="overflow-hidden">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </main>
  );
};

export default Layout;
