import axios from "axios";
export const axiosPublic = axios.create({
  // baseURL: "https://benzine-prokashon-g41m.onrender.com/",
  // baseURL: "http://localhost:5000/",
  baseURL: "https://server-ff1gkew82-benzenes-projects-823a052c.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
