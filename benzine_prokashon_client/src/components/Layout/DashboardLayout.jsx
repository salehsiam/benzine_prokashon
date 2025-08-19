import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";
import { AppSidebar } from "../ui/app-sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
