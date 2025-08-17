import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../Layout/DashboardLayout";
import AddBooks from "../Pages/Home/Dashnoard/AddBooks/AddBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "add-books",
        element: <AddBooks />,
      },
    ],
  },
]);

export default router;
