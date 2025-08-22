import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import logo from "./../../assets/logo.png";

const genres = ["থ্রিলার", "হরর", "গোয়েন্দা", "ফ্যান্টাসি", "মিথলজি"];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-200 pt-12 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <img className="w-12" src={logo} alt="" />

            <p className="text-gray-400 mt-4">রসায়ন জমুক বইয়ের পাতায় সাথে..</p>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/benzeneprokashon"
                className="hover:text-blue-500 transition text-xl"
              >
                <FaFacebookF />
              </a>

              <a href="#" className="hover:text-pink-500 transition text-xl">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400 transition">
                  হোম
                </a>
              </li>
              <li>
                <a href="/all-books" className="hover:text-blue-400 transition">
                  সকল বই
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-blue-400 transition">
                  যোগাযোগ
                </a>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Genres</h3>
            <ul className="space-y-2">
              {genres.map((genre) => (
                <li key={genre}>
                  <a
                    href={`/all-books?genre=${encodeURIComponent(genre)}`}
                    className="hover:text-blue-400 transition"
                  >
                    {genre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Address / Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex gap-2">
                <FaMapMarkerAlt /> ৩৮/এ, হাজী এ এন আলী টাওয়ার, বাংলাবাজার,
                ঢাকা-১১০০
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt /> ০১৯১৯৫২৫১৪৩
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> benzeneprokashon@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Benzene Prokashon. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
