import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom"; // <-- Add this
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/users/userActions";

const navLinks = [
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
  { to: "/add-product", label: "Add Product", adminOnly: true }, // admin only
];

const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const currentUser = useSelector((state) => state.user.currentUser);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-between items-center select-none px-6 md:px-10 py-4  bg-white relative"
    >
      <NavLink to="/">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-2xl text-gray-900 font-[MonaSans]"
        >
          Koel's
        </motion.div>
      </NavLink>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-10 lg:gap-14 py-4 px-5 text-gray-700 font-medium">
        {navLinks
          .filter(
            (link) => !link.adminOnly || (currentUser && currentUser.isAdmin)
          )
          .map((link) => (
            <div key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `hover:text-black text-sm ${
                    isActive ? "font-bold text-black" : ""
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </div>
          ))}

        {/* User/Profile NavLink as the last item */}
        <div className="flex items-center gap-3">
          {/* You can add extra menu items here if needed */}

          {!currentUser ? (
            <>
              <NavLink to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <div className="relative" ref={menuRef}>
                <span
                  className="text-green-600 text-sm font-semibold cursor-pointer select-none"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  Hi, {currentUser.name}
                </span>
                {showMenu && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg min-w-[140px] z-50">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setShowMenu(false);
                        setOpen(false);
                      }}
                    >
                      Profile
                    </NavLink>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      onClick={() => {
                        setShowMenu(false);
                        setOpen(false);
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </button>

                    {currentUser?.isAdmin && (
                      <NavLink
                        to="/admin/orders"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setShowMenu(false);
                          setOpen(false);
                        }}
                      >
                        Admin Panel
                      </NavLink>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
      {/* Mobile Hamburger */}
      <div
        className="md:hidden flex flex-col justify-between w-5 h-5 cursor-pointer z-30"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span
          className={`h-1 w-full bg-gray-700 rounded transition-all duration-300 ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-gray-700 rounded transition-all duration-300 ${
            open ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-gray-700 rounded transition-all duration-300 ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 w-full h-full  bg-white shadow-lg flex flex-col items-start gap-8 px-8 py-20 z-20 md:hidden overflow-y-auto"
          >
            {navLinks
              .filter(
                (link) =>
                  !link.adminOnly || (currentUser && currentUser.isAdmin)
              )
              .map((link, idx) => (
                <motion.div
                  key={link.label}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.1 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-lg font-semibold text-gray-800 hover:text-black ${
                        isActive ? "font-bold text-black" : ""
                      }`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

            {/* Add this below navLinks in mobile menu */}
            <div className="mt-4">
              {!currentUser ? (
                <NavLink
                  to="/signup"
                  className="text-blue-600 hover:underline text-lg font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </NavLink>
              ) : (
                <>
                  <div className="relative" ref={menuRef}>
                    <span
                      className="text-green-600 text-lg font-semibold cursor-pointer select-none"
                      onClick={() => setShowMenu((prev) => !prev)}
                    >
                      Hi, {currentUser.name}
                    </span>
                    {showMenu && (
                      <div className="absolute right-0 translate-x-10  mt-2 bg-white border rounded shadow-lg min-w-[140px] z-50">
                        <NavLink
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setShowMenu(false);
                            setOpen(false);
                          }}
                        >
                          Profile
                        </NavLink>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                          onClick={() => {
                            setShowMenu(false);
                            setOpen(false);
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-10 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
