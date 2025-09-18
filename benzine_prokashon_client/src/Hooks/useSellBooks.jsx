// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

// const useSellBooks = (period, page = 1, limit = 20) => {
//   const axiosSecure = useAxiosSecure();

//   const fetchSellItems = async () => {
//     const { data } = await axiosSecure.get("/sell-items", {
//       params: { period, page, limit },
//     });
//     return data;
//   };

//   return useQuery({
//     queryKey: ["sell-items", period, page, limit],
//     queryFn: fetchSellItems,
//     keepPreviousData: true,
//   });
// };

// export default useSellBooks;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellBooks = ({
  period,
  page = 1,
  limit = 20,
  sellerEmail,
  startDate,
  endDate,
}) => {
  const axiosSecure = useAxiosSecure();

  const fetchSellItems = async () => {
    const params = {
      period,
      page,
      limit,
      ...(sellerEmail && { sellerEmail }),
    };

    // Only include when custom is selected
    if (period === "custom" && startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    const { data } = await axiosSecure.get("/sell-items", { params });
    return data;
  };

  return useQuery({
    queryKey: [
      "sell-items",
      { period, page, limit, sellerEmail, startDate, endDate },
    ],
    queryFn: fetchSellItems,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

export default useSellBooks;
