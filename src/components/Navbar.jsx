import React, { useState } from "react";
import { Bars3Icon,MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import RightSidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  return (
    <>
      <nav className="shadow-lg fixed right-0 left-0 flex justify-between items-center p-6 bg-white h-25 text-black z-20">
       
        <div className="flex gap-7">
         
        {/* Existing hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon className="w-8 h-8" />
        </button>
          </div>
       
        <div>
           <h1 className="font-bold text-2xl text-gray-900">FEENICKS1</h1>
           {/* <span className="text-base font-medium">ASSET MANAGEMENT</span> */}
        </div>

        <div>
          <button
          onClick={()=>navigate("/signin")}
           className="border-1 border-[#2f5d50] py-3 px-7 font-medium rounded-full  text-lg text-gray-900 shadow-xl bg--[#e6f2ef]">Login</button>
        </div>
       
         
        
      </nav>
      {/* Right sidebar */}
      <RightSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default Navbar;