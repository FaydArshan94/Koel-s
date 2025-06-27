import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom"; // <-- Add this
import { useSelector } from "react-redux";

const navLinks = [
  { to: "/products", label: "Products" },
  { to: "/cart", label: "Cart" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    console.log("Redux currentUser:", currentUser);
  }, [currentUser]);

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
        {navLinks.map((link, idx) => (
          <motion.div
            key={link.label}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + idx * 0.15,
              ease: "easeOut",
            }}
          >
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
          </motion.div>
        ))}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          {/* You can add extra menu items here if needed */}

          {!currentUser ? (
            <>
              <NavLink to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-green-600">Hi, {currentUser.name}</span>
            </>
          )}
        </motion.div>
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
            {navLinks.map((link, idx) => (
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
