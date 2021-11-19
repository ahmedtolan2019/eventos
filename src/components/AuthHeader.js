import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Logout } from "./Logout";

const links = [
  { route: "/events", text: "Events" },

  { route: "/dashboard", text: "Dashboard" },
  { route: "/bookings", text: "Bookings" },
];
export const AuthHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" relative flex flex-row py-4 z-30  justify-between text-gray-800">
      {/* Logo */}
      <div className="flex flex-none space-x-2 sm:space-x-4 items-center hover:text-gray-600 cursor-pointer ">
        <div className="flex items-center justify-center  ">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 md:h-14 md:w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Link>
        </div>
        <p className="font-normal text-2xl sm:text-4xl">
          <Link to="/">Eventos</Link>
        </p>
      </div>
      {/* Links */}
      <ul className="hidden sm:flex  items-center  space-x-8 font-normal text-xl lg:text-2xl">
        {links.map((link) => (
          <li key={link.route} className="hover:text-gray-500 cursor-pointer  ">
            <NavLink
              className="transition-all duration-200 ease-in-out"
              to={link.route}
            >
              {link.text}
            </NavLink>
          </li>
        ))}
        <li className="hover:text-gray-500 cursor-pointer  ">
          <Logout />
        </li>
      </ul>
      {open && (
        <ul className="sm:hidden absolute top-14 w-full gap-4 mx-auto bg-gray-100 h-56 rounded p-2 shadow-lg flex flex-col  items-center  font-normal text-xl lg:text-2xl">
          {links.map((link) => (
            <li
              key={link.route}
              className="hover:text-gray-500 bg-white h-16 items-center  border  rounded shadow-lg flex justify-center w-full text-center cursor-pointer  "
            >
              <NavLink
                className="transition-all duration-200 ease-in-out"
                to={link.route}
              >
                {link.text}
              </NavLink>
            </li>
          ))}
          <li>
            <Logout />
          </li>
        </ul>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="flex sm:hidden items-center text-gray-900  cursor-pointer focus:ring-2 ring-offset-1 ring-gray-400 rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
