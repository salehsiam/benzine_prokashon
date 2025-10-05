import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../SharedComponent/Navbar";
import Footer from "../SharedComponent/Footer";
import ScrollToTop from "../SharedComponent/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
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
