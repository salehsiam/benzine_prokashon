import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Home from "../Pages/Home";
import AddBooks from "../Pages/Admin/AddBooks";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ManageBooks from "../Pages/Admin/ManageBooks";
import SellDetails from "../Pages/Admin/SellDetails";

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
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "add-books",
        element: <AddBooks />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "sell-details",
        element: <SellDetails />,
      },
    ],
  },
]);

export default router;
