import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import { Toaster } from "sonner";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
      <Toaster />
    </div>
  );
};

export default MainLayout;
