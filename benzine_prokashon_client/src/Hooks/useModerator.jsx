import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useModerator = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: isModerator = false,
    isPending: isModeratorLoading,
    error,
  } = useQuery({
    queryKey: ["isModerator", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/moderator/${user.email}`);
        return res.data?.moderator;
      } catch (err) {
        console.error("Moderator check failed:", err);
        return false;
      }
    },
  });

  return [isModerator, isModeratorLoading, error];
};

export default useModerator;
