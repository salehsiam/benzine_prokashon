import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const DashboardLayout = () => {
  return (
    <div className="">
      <Toaster />
      <h1>Sidebar</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
