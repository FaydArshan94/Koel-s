import React from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#About", label: "About" },
  { href: "#Feature", label: "Feature" },
  { href: "#Blog", label: "Blog" },
  { href: "#menu", label: "menu" },
];

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex justify-between items-center select-none px-10 py-4 bg-white"
    >
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="text-2xl text-gray-900 font-[MonaSans]"
      >
        Koel's
      </motion.div>
      <nav className="hidden md:flex gap-14 py-4 text-gray-700 font-medium">
        {navLinks.slice(0, 3).map((link, idx) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.15, ease: "easeOut" }}
            className="hover:text-black text-sm"
          >
            {link.label}
          </motion.a>
        ))}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <a href="#menu" className="hover:text-black text-sm capitalize">
            menu
          </a>
          <div className="flex relative flex-col justify-between w-4 h-[8px] top-1 cursor-pointer">
            <span className="h-0.5 w-[8px] absolute right-0 -top-[6px] bg-gray-700 rounded"></span>
            <span className="h-0.5 bg-gray-700 rounded"></span>
            <span className="h-0.5 w-[12px] bg-gray-700 rounded"></span>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Navbar;