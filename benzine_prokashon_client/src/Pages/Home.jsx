import React from "react";
import ThrillerBooks from "../components/modules/HomePage/ThrillerBooks";
import RecentBooks from "../components/modules/HomePage/RecentBooks";

const Home = () => {
  return (
    <div className="pt-32 px-2 md:px-0 max-w-7xl mx-auto space-y-8">
      <RecentBooks />
      <ThrillerBooks />
    </div>
  );
};

export default Home;
