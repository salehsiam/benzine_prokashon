import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useBooks = (
  page = 1,
  limit = 10,
  search = "",
  sortOrder = "asc",
  sortBy = "price",
  genre = ""
) => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["books", page, limit, search, sortOrder, sortBy, genre],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/books", {
          params: { page, limit, search, sortOrder, genre, sortBy },
        });
        console.log("API response:", res.data); // Debug log
        return res.data;
      } catch (err) {
        console.error("Error fetching books:", err); // Debug log
        throw err;
      }
    },
    keepPreviousData: true,
  });

  return {
    books: data?.books || [],
    totalBooks: data?.totalBooks || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || 1,
    refetch,
    isLoading,
    error,
  };
};

export default useBooks;
