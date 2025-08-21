import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import Footer from "../SharedComponent/Footer";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
