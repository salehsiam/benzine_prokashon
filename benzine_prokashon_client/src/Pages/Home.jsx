import React from "react";
import ThrillerBooks from "../components/modules/HomePage/ThrillerBooks";
import RecentBooks from "../components/modules/HomePage/RecentBooks";
import BannerCarousel from "../components/modules/HomePage/BannerCarousel";

const Home = () => {
  return (
    <div className="pt-32 px-2 md:px-0 max-w-7xl mx-auto space-y-8">
      <BannerCarousel />
      <ThrillerBooks />
      <RecentBooks />
    </div>
  );
};

export default Home;
