import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Skeleton } from "../../ui/skeleton";

const BannerCarousel = () => {
  const axiosPublic = useAxiosPublic();

  // React Query fetching banners
  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data?.main || [];
    },
  });

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-2xl shadow-md w-full mx-auto">
        {/* Image Placeholder */}
        <Skeleton className="h-56 w-full rounded-xl mb-4" />

        {/* Text Placeholders */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4 rounded-lg" />
          <Skeleton className="h-4 w-1/2 rounded-lg" />
          <Skeleton className="h-4 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-red-500">Failed to load banners</p>
      </div>
    );
  }

  if (!banners.length) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No banners available</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden shadow-lg">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        // navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
