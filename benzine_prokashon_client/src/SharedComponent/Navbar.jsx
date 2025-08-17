import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // or 'next/link' if Next.js
import { FaSearch } from "react-icons/fa";
import { CiHeart, CiUser } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import logo from "../assets/logo.png"; // adjust path if needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Example navLinks
  const navLinks = [
    {
      name: "হোম",
      href: "/",
    },
    {
      name: "সকল বই",
      href: "/all-books",
    },
    {
      name: "লেখকবৃন্দ",
      href: "/authors",
    },
    {
      name: "ড্যাশবোর্ড",
      href: "/dashboard",
    },
    {
      name: "যোগাযোগ",
      href: "/contact",
    },
  ];

  // React Router way (for Next.js, use `usePathname()` from 'next/navigation')
  const location = useLocation();
  const pathname = location.pathname;

  const placeholders = [
    "Search books...",
    "Search authors...",
    "Search articles...",
  ];
  const index = 0; // you can make this dynamic later

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      <nav className="w-full px-4 py-6 z-50 bg-white fixed top-0 left-0 shadow-md">
        <div className="max-w-7xl mx-auto w-full relative flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex-shrink-0 z-10">
            <Link to="/" className="hover:text-primary flex items-center">
              <img src={logo} alt="Benzine Logo" width={42} height={42} />
            </Link>
          </div>

          {/* Center - Menu */}
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

          {/* Right - Search & Icons */}
          <div className="hidden md:flex items-center gap-2 z-10">
            {/* Search */}
            <div className="relative hidden lg:flex max-w-md w-full">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder={placeholders[index]}
                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
              />
            </div>
            <button className="px-4 py-2 text-2xl hover:bg-opacity-90 transition border-r">
              <CiHeart />
            </button>
            <button
              onClick={() => alert("Sign In logic here")} // replace with signIn()
              className="px-4 py-2 text-2xl hover:bg-opacity-90 transition"
            >
              <CiUser />
            </button>
          </div>

          {/* Mobile Toggle */}
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

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 gap-4">
          <button onClick={closeDrawer} className="self-start mb-4 text-2xl">
            <IoClose />
          </button>
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
