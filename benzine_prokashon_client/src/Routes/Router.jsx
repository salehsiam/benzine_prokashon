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
import BookDetails from "../Pages/User/BookDetails";
import BannerManagement from "../Pages/Admin/BannerManagement";
import Dashboard from "../Pages/Admin/Dashboard";
import EditBook from "../Pages/Admin/EditBook";
import BookSalesTable from "../Pages/Admin/BookSalesTable";
import AllUsersPage from "../Pages/Admin/AllUsersPage";

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
        path: "book-details/:id",
        element: <BookDetails />,
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
        path: "/dashboard",
        element: <BookSalesTable />,
      },
      {
        path: "add-books",
        element: <AddBooks />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "sell-details",
        element: <SellDetails />,
      },
      {
        path: "all-users",
        element: <AllUsersPage />,
      },
      {
        path: "input-selling-details",
        element: <InputSellingDetails />,
      },
      {
        path: "manage-banners",
        element: <BannerManagement />,
      },
    ],
  },
]);

export default router;
