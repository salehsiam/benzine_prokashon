import axios from "axios";
export const axiosPublic = axios.create({
  baseURL: "https://benzine-prokashon-g41m.onrender.com/",
  // baseURL: "http://localhost:5000/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
