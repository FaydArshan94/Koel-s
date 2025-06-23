import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center select-none px-10 py-4 bg-white ">
      <div className="text-2xl  text-gray-900 font-[MonaSans]">Koel's</div>
      <nav className="hidden md:flex gap-14 py-4 text-gray-700 font-medium">
        <a href="#About" className="hover:text-black text-sm" >About</a>
        <a href="#Feature" className="hover:text-black text-sm">Feature</a>
        <a href="#Blog" className="hover:text-black text-sm">Blog</a>
        
        <div className="flex items-center gap-3">
          <a href="#menu" className="hover:text-black text-sm capitalize">menu</a>
          <div className="flex relative  flex-col justify-between w-4 h-[8px] top-1 cursor-pointer">
            <span className="h-0.5  w-[8px] absolute right-0 -top-[6px]  bg-gray-700 rounded"></span>
            <span className="h-0.5   bg-gray-700 rounded"></span>
            <span className="h-0.5  w-[12px] bg-gray-700 rounded"></span>
          </div>
        </div>
      
      </nav>
     
      
    </header>
  );
};

export default Navbar;
