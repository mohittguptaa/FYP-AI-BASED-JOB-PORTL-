/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  console.log(user)

  
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary estimate" },
    { path: "/post-job", title: "Post A Job" },
    { path: "/Resume", title: "Build Your Resume" },
  ];
  return (
    <header className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      <nav className="flex items-center justify-between py-6">
        <a href="/" className="flex items-center gap-2 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="30"
            viewBox="0 0 29 30"
            fill="none"
          >
            <circle
              cx="12.0143"
              cy="12.5143"
              r="12.0143"
              fill="#3575E2"
              fillOpacity="0.4"
            />
            <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
          </svg>
          <span>JobPortal</span>
        </a>

        {/* nav items */}
        <ul className="hidden gap-12 md:flex">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* sign up signout btn */}
        <div className="hidden space-x-5 text-base font-medium text-primary lg:block">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <div class="flex -space-x-2 overflow-hidden">
                  {
                    user?.photoURL ? <> <img
                    className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                    src={user?.photoURL}
                    alt=""
                  /></> : <> <img
                    className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  /></>
                  }
                 
                </div>
                <button onClick={handleLogout} className="px-5 py-2 border rounded hover:bg-blue hover:text-white">Log out</button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <Link to="/login" className="px-5 py-2 border rounded">
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="px-5 py-2 text-white rounded bg-blue"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="block md:hidden">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (
              <>
                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="py-1 text-base text-white first:text-white"
            >
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="py-1 text-white">
            <Link to="login">Log in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
