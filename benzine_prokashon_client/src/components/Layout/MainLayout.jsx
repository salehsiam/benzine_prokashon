import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
