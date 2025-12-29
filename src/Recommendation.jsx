import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {HiCheckCircle } from "react-icons/hi";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { HiChevronRight } from "react-icons/hi";

function Recommendation() {
  const navigate=useNavigate();
    const packages=[
      {
        name:"Forex Trading Capital",
        price:"GH₵ 360.00 - No limit ",
        description:"Enter a global currency market with guidance and strategies to maximize returns.",
        ticker:"",
        category:"popular"
        
      },
      {
        name:"Investwise Capital",
        price:"GH₵ 500.00 - GH₵ 2999.00",
        description:"Smart,diversified investment options curated to balance risk and reward.",
        ticker:"",
      },
      {
        name:"Mutual Fund Capital",
        price:"GH₵ 140- GH₵ 499.00",
        description:"Access professionally managed portfolios with multiple assets,ideal for hands-off investing.",
        ticker:"",
      },
      {
        name:"Real Estate Capital",
        price:"GH₵ 5000.00 - GH₵100,000.00",
        description:"Invest in Property ventures with the potential for steady income and long-term appreciation,",
        ticker:"",
      },
      {
        name:"Bitsusu Capital",
        price:"GH₵ 100-No limit",
        description:"Invest in Bitcoin and other digital assets to grow your crypto portfolio.",
        ticker:"",
      },
      {
        name:"Agribusiness Capital",
        price:"GH₵ 3000.00 - GH₵ 4999.00 ",
        description:"Support and profit from the booming agricultural sector while promoting sustainability",
        ticker:"",
      },
    ]
    const [selected,setSelected]=useState(null);

    return (
    <div className="w-full bg-white">
      <div className="w-full h-30 ">
        <Navbar />
      </div>
      <div className="w-full p-4 mt-5 h-50 bg-orang-400">
        <h2 className="text-left pl-4 leading-normal text-3xl font-medium mb-12">
          Let's Choose Your Investment Packages
        </h2>
        <span className="text-left pl-4 leading-normal mb-12 text-gray-700">
         Our tailored Investment Packages for you
        </span>
        
      </div>

        <div className="p-6 flex flex-col gap-10">
          {packages.map(item=>
          <>
           <div key={item.name
           }
           onClick={()=>setSelected(item.name)}
           className={`${selected==item.name?'bg-blue-50 border-blue-400 border-2':"bg-white border-gray-300 text-gray-800" 
            } 
           p-4 border-1 w-full rounded-lg flex`}
           >
            <div>
            <div className=" inline-flex items-center py-2  px-3 justify-center bg-blue-100 border-1 border-blue-300  text-blue-600 font-medium rounded-2xl">{item.price}</div>
            <h2 className="text-md font-medium mt-3 mb-3">{item.name}</h2>
           <span className="">{item.description}</span>
           <div className="flex items-center gap-1">
              <p className="text-blue-600 mt-7 underline">Learn more</p>
            <HiChevronRight className="mt-8 text-blue-600"/>
           </div>
           
            </div>
            {selected===item.name ? 
            ( <div className="flex-1 mt-2 ">
            <CheckCircleIcon className="w-6 h-6 text-blue-500"/>
           </div>):
           <div>
            <input type="radio" className="w-5 h-5" />
           </div>
           
            }
          

           </div>
           
           
          
           </>
          )}

            <motion.button
          onClick={()=>navigate("/terms")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 40 }}
          transition={{ duration: 0.5 }}
          className="mb-10 p-5 py-3 bg-blue-600 rounded-lg text-white font-medium text-lg "
        >
          Continue
        </motion.button>
        
        </div>

        



    </div>
  );
}
export default Recommendation;
