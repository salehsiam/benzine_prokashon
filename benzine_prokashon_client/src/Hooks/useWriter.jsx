import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useWriter = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: isWriter = false,
    isPending: isWriterLoading,
    error,
  } = useQuery({
    queryKey: ["isWriter", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/writer/${user.email}`);
        return res.data?.writer;
      } catch (err) {
        console.error("Writer check failed:", err);
        return false;
      }
    },
  });

  return [isWriter, isWriterLoading, error];
};

export default useWriter;
