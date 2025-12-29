import { BellIcon } from "@heroicons/react/24/outline";
import { AiOutlineEyeInvisible, AiOutlineArrowUp } from "react-icons/ai";
import { FiEye, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import photo5 from "./assets/images/photo5.png";
import { useState,useEffect } from "react";
function Dashboard({profileName}) {
  const [hide, setHide] = useState(false);
  const [popup,setpopup]=useState(false);
  const [amount, setAmount] = useState("");
  const [shake, setShake] = useState(false);
  const navigate=useNavigate();

   const handleNext = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500); // remove shake after animation
      return; // prevent navigation
      
    }
    else{
      navigate("/depositmethod");
    }
   
  };

  const handleShow = () => {
    setHide(!hide);
  };
  useEffect(()=>{
   setpopup(true);
   },[])

  return (
    <div className="w-full p-4">

      <div className="w-full h-20 bg-re-500 mb-4 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-11 h-11 rounded-full bg-yellow-500">
            <img src={photo5} className="rounded-full" alt="" />
          </div>
          <div>
            <h2 className="font-medium text-lg text-gray-800">Hi,{""}{profileName}</h2>
            <span className="text-gray-600">Welcome!</span>
          </div>
        </div>

        <div className="relative">
          <BellIcon className="w-6 h-6" />
          <div className="absolute p-1 top-0 right-1 bg-red-600 rounded-full"></div>
        </div>
      </div>

      <div className="p-4 rounded-md w-full bg-gradient-to-r from-blue-400 via-blue-800 to-blue-900  shadow-xl">
        <h2 className="text-white font-small text-2xl font-light">
          Total Balance
        </h2>
        <div className="flex items-center gap-16 mt-4 justify-between">
          {hide ? (
            <p className="text-4xl text-white mt-2">********</p>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-2xl text-white mt-2">GH₵ 0.00</p>
              <div className="relative flex items-center right-0 h-10 bg-re-600">
                <p className="text-green-400 mt-2 font-medium">2.03%</p>
                <AiOutlineArrowUp className="absolute bottom-2 -right-5 w-4 h-4 text-green-400 font-medium " />
              </div>
            </div>
          )}

          <div onClick={handleShow} className="">
            {hide ? (
              <FiEye className="w-6 h-6 mt-3 text-white" />
            ) : (
              <AiOutlineEyeInvisible className="w-6 h-6 mt-3 text-white" />
            )}
          </div>
        </div>
        <div className="flex gap-7 items-center justify-between mt-14">
          <p className="text-white font-medium mt-4 text-xl">
            +233 *** *** ***
          </p>
          <div className="mt-3 py-2 px-3 rounded-full text-blue-200 flex items-center bg-blue-700">
            Account No
          </div>
        </div>
      </div>

      <div className="flex w-full mt-10 gap-6">
        <Link to="/depositmethod"className="shadow-2xl flex-1 gap-3 flex items-center bg-blue-100 rounded-full">
             <div className="shadow-2xl flex-1 gap-3 flex items-center bg-blue-100 rounded-full">
          <div className="rounded-sm w-5 h-5 border-1 border-blue-900 ml-4 flex items-center justify-center">
            <FiArrowDownRight className="transform rotate-78 text-blue-900" />
          </div>
          <p className="text-gray-800 font-small">Deposit</p>
        </div>
        </Link>
       

        <div className="flex-1 py-3 shadow-2xl bg-violet-100 rounded-full">
          <div className="flex-1 gap-3 flex items-center rounded-full">
            <div className="rounded-sm w-5 h-5 border-1 border-violet-900 ml-4 flex items-center justify-center">
              <FiArrowUpRight className="transform rotate-135 text-violet-900" />
            </div>
            <p className="text-gray-800 font-small">Withdraw</p>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full bg-re-400 p-1 flex flex-col gap-5">
       
       <div className="flex flex-col gap-1">
        <p className="text-lg font-medium text-gray-700">Total Funded</p>
        <span className="text-gray-800 text-lg font-normal">GH₵ 0.00</span>
       </div>
       <div className="w-full h-[1px] bg-gray-100"></div>

       <div className="flex flex-col gap-1">
        <p className="text-lg font-medium text-gray-700">Total Earned</p>
        <span className="text-gray-800 text-lg font-normal">GH₵ 0.00</span>
        </div>
        <div className="w-full h-[1px] bg-gray-100"></div>

        <div className="flex flex-col gap-1">
        <p className="text-lg font-medium text-gray-700">Total Withdrawn</p>
        <span className="text-gray-800 text-lg font-normal">GH₵ 0.00</span>
       
       </div>
       </div>


       <div className="w-full bg-re-500 mt-14 mb-40">
          <div>
            <h2 className="font-medium text-gray-700 text-sm">RECENT TRANSACTIONS</h2>
            <div className="w-full mt-10 py-3 rounded-lg bg-gray-100 flex items-center justify-center"><span className="text-sm">No transactions to display</span></div>
          </div>
          
       </div>

       <div className="z-10 fixed w-full h-20 p-4 bottom-0 right-0">
            <button className="py-3 bg-blue-700 text-white w-full rounded-lg font-medium border-none outline-none">Add Funds</button>
       </div>

       {popup ?
        <div className="fixed top-0 bottom-0 right-0 inset-0 bg-black/50 w-full z-20"> </div>:null }
      

      

      {popup &&
       <div className="w-full pl-2 py-6 px-2 h-110 fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50">
          <span className="text-4xl ">🥳</span>
          <p className="ml-4 mt-6 font-small text-md text-black">
            Now that your investment account is ready,
            how about you make that first deposit? just 
            enter the amount to get started.It must be 
            at least GH₵ 100.00</p>
            <div className="ml-3 mr-3">
            <input
             value={amount}
            onChange={(e) =>setAmount(e.target.value)}
            type="number" 
            placeholder="GH₵ 100.00"
            className={`${shake ? "shake border-1 border-red-500" : "border-gray-300"}
            text-xl pl-4 w-full h-18 bg-gray-100 rounded-lg mt-8 `} />
           
            <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
          }
          .shake {
            animation: shake 0.5s ease-in-out;
          }
        `}
            </style>


             <button 
             onClick={handleNext}
             className="py-3 
             hover:bg-blue-700 transition 
             mt-8 bg-blue-700 text-white w-full rounded-lg font-medium border-none outline-none">
              Continue</button>
             <div
             onClick={()=>setpopup(false)} 
             className="flex justify-center items-center mt-8"><span className="font-medium text-gray-900 text-lg">
              Later</span></div>
            </div>

            
       </div>
      }
     
     
     
      </div>


   
  );
}
export default Dashboard;
