import React, { useState } from "react";
import { Bars3Icon,MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import RightSidebar from "./sidebar";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="fixed right-0 left-0 flex justify-between items-center p-4 bg-white h-25 text-black z-20">
        <div>
           <h1 className="font-bold text-2xl">FEENICKS1</h1>
           <span className="text-base font-medium">ASSET MANAGEMENT</span>
        </div>
       
          <div className="flex gap-7">
          <MagnifyingGlassIcon className="w-8 h-8"/>
        {/* Existing hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Bars3Icon className="w-8 h-8" />
        </button>
          </div>
        
      </nav>
      {/* Right sidebar */}
      <RightSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
export default Navbar;