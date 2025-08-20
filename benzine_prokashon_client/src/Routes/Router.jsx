import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Home from "../Pages/Home";
import AddBooks from "../Pages/Admin/AddBooks";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ManageBooks from "../Pages/Admin/ManageBooks";
import SellDetails from "../Pages/Admin/SellDetails";
import InputSellingDetails from "../Pages/Admin/InputSellingDetails";
import AllBooks from "../Pages/User/AllBooks";
import CartPage from "../Pages/User/CartPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },
      {
        path: "cart",
        element: <CartPage />,
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
      {
        path: "input-selling-details",
        element: <InputSellingDetails />,
      },
    ],
  },
]);

export default router;
