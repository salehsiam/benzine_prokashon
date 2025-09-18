import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://benzine-prokashon-g41m.onrender.com/",
  // baseURL: "http://localhost:5000/",
});

// Flag to prevent adding interceptors multiple times
let isInterceptorAdded = false;

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  if (!isInterceptorAdded) {
    // Request interceptor
    axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        // Only logout on 401 (unauthorized)
        if (status === 401) {
          try {
            await logOut();
          } catch (err) {
            console.error("Error during logout:", err);
          }
        }

        return Promise.reject(error);
      }
    );

    isInterceptorAdded = true; // ensure interceptors are added only once
  }

  return axiosSecure;
};

export default useAxiosSecure;
