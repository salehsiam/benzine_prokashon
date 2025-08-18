import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex justify-center items-center bg-green-500 flex-col ">
      <h1>Sidebar</h1>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
