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
import AdminRoute from "./AdminRoute";
import ContactPage from "../Pages/User/ContactPage";
import MyBooks from "../Pages/Writer/MyBooks";
import ForgotPassword from "../components/modules/Authentication/ForgotPassword";

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
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "my-books",
        element: <MyBooks />,
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
    path: "forgot-password",
    element: <ForgotPassword />,
  },

  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <BookSalesTable />
          </AdminRoute>
        ),
      },
      {
        path: "add-books",
        element: (
          <AdminRoute>
            <AddBooks />
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <AdminRoute>
            <EditBook />
          </AdminRoute>
        ),
      },
      {
        path: "sell-details",
        element: (
          <AdminRoute>
            <SellDetails />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsersPage />
          </AdminRoute>
        ),
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
