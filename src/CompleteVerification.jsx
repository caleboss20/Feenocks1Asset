import { CheckCircleIcon } from "@heroicons/react/24/solid";
import BackArrow from "./components/Backarrow";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {FiCopy,FiInfo } from "react-icons/fi";

function CompleteVerification({ selectedId, setSelectedId }) {
  
    const [accountID, setAccountID] = useState(generateFAMID());
  const [copied, setCopied] = useState(false);
  // Function to generate FAM ID
  function generateFAMID(){
    const randomPart = () => Math.random().toString(36).substring(2, 7).toUpperCase();
    return `FAM-${randomPart()}-${randomPart()}`;
  }
  // Copy to clipboard 
  const handleCopy = () => {
    navigator.clipboard.writeText(accountID);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // reset after 1.5s
  };
  
  
  
  const navigate = useNavigate();
  const goback = () => {
    navigate("/verification4");
  };
  const [show,setShow]=useState(false);
  useEffect(()=>{
   const timer=setInterval(()=>{
   setShow(true);
   },1000)
   return()=>clearInterval(timer);
  },[])

  const next=()=>{
    navigate("/assessment");
  }



  return (
    <div className="w-full h-screen bg-geen-400 p-4">
      <div className="flex gap-20 mt-5">
        <div onClick={goback}>
          <BackArrow />
        </div>
        <h2 className="font-medium text-xl text-center">Verify Your identity</h2>
      </div>

      <div className="mt-10 p-2 bg-green-100 w-full rounded-md ">
        <div className="flex gap-4">
          <CheckCircleIcon className="w-8 h-8 text-green-700" />
          <span className="font-medium text-green-900 text-lg">
            Your account is verified
          </span>
        </div>
        <h2 className="text-green-900 text-lg mt-2">
          You have completed all verification steps and have access to all
          features
        </h2>
      </div>



     

      <div className="items-center flex justify-between mt-15 p-2 w-full rounded-md">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-black text-lg ">
            Identity Verification
          </h2>
          <span className="text-gray-700 text-lg">{selectedId}</span>
        </div>
        <div className="bg-green-100 p-2 rounded-lg">
          <p className="font-medium text-green-900">Completed</p>
        </div>
      </div>

        <div className="pr-3 flex justify-between items-center mt-10 p-4 bg-green-50 w-full rounded-md ">
         <div className="flex flex-col gap-2">
          <p className="text-green-800 font-medium">Identification Number</p>
          <span className="font-medium text-black text-xl">{accountID}</span>
          
         </div>
         <div
         onClick={handleCopy} 
         >
          {copied? <span>copied!</span>:<FiCopy size={20}/>}
          
         </div>
        
        </div>

        <div className="flex gap-4 items-start mt-7 pl-2">
         
          <div className="flex-1 mt-1.5">
         <FiInfo className="text-amber-500 "/>
          </div>
          <div>
            <span className="text-amber-500 font-medium">Please note:</span>
          <span className="text-amber-500">This Account ID is a unique identifier
            for your Feenicks1 Asset Management account and may be required for support or account reference.
          </span>
          </div>
          
        </div>

     <div className=" p-3 w-full h-20 bg-re-500 flex flex-col items-center justify-center ">
        <motion.button
        onClick={next}
         initial={{ opacity: 0, y: 20 }}
          animate={ show? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }} 
        className="mt-10 w-full py-3 bg-blue-600 text-white font-medium text-lg rounded-md">Continue
        </motion.button>
      </div> 
    </div>
  );
}
export default CompleteVerification;
