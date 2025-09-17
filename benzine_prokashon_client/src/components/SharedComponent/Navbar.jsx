import React, { useState } from "react";
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Note: IoClose import was incorrect, using react-icons/fa
import { IoClose } from "react-icons/io5";
import logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";
import { BookHeart, LogOut, ShoppingCart, UserRoundPlus } from "lucide-react";
import debounce from "lodash/debounce";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [isAdmin, isAdminLoading] = useAdmin();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const navLinks = [
    { name: "হোম", href: "/" },
    { name: "সকল বই", href: "/all-books" },
    ...(isAdmin ? [{ name: "ড্যাশবোর্ড", href: "/dashboard" }] : []),
    { name: "যোগাযোগ", href: "/contact" },
  ];

  const placeholders = [
    "বইয়ের নাম লিখুন",
    "লেখকের নাম লিখুন",
    "বিষয়ের নাম লিখুন",
  ];
  const index = 0;

  const closeDrawer = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateSearch = debounce((value) => {
    console.log("Navbar updating search:", value);
    const params = Object.fromEntries(searchParams);
    if (value) {
      setSearchParams({ ...params, search: value, page: 1 });
      if (pathname !== "/all-books") {
        navigate("/all-books");
      }
    } else {
      delete params.search;
      setSearchParams(params);
    }
  }, 300);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    updateSearch(value);
  };

  return (
    <>
      <nav className="w-full px-4 py-4 z-50 bg-white fixed top-0 left-0 shadow-md">
        <div className="max-w-7xl mx-auto w-full relative flex items-center justify-between">
          <div className="flex-shrink-0 z-10">
            <Link to="/" className="hover:text-primary flex items-center">
              <img src={logo} alt="Benzine Logo" width={42} height={42} />
            </Link>
          </div>

          <div className="hidden md:flex gap-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname.startsWith(link.href) && link.href !== "/");
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`hover:text-primary px-2 ${
                    isActive ? "text-primary font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 z-10">
            <div className="relative hidden lg:flex max-w-md w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder={placeholders[index]}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>

            <button className="px-4 py-2 text-2xl hover:bg-opacity-90 transition border-r">
              <Link to="/cart" className="flex items-center gap-1">
                <ShoppingCart />
              </Link>
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-2xl hover:bg-opacity-90 transition"
              >
                <LogOut />
              </button>
            ) : (
              <button className="px-4 py-2 text-2xl hover:bg-opacity-90 transition">
                <Link to="/login">
                  <UserRoundPlus />
                </Link>
              </button>
            )}
          </div>

          <div className="md:hidden z-10">
            <button onClick={() => setIsOpen(true)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          <button onClick={closeDrawer} className="self-start mb-4 text-2xl">
            <IoClose />
          </button>
          <div className="relative w-full mb-4">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder={placeholders[index]}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeDrawer}
                className={`hover:text-primary px-2 ${
                  isActive ? "text-primary font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex gap-4 mt-4">
            <Link to="/cart" onClick={closeDrawer}>
              <ShoppingCart />
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeDrawer();
                }}
              >
                <LogOut />
              </button>
            ) : (
              <Link to="/login" onClick={closeDrawer}>
                <UserRoundPlus />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
