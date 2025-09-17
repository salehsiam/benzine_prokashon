import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useSellProgress = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["sell-progress"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/sales/progress");
      return data;
    },
  });
};

export default useSellProgress;
