import deposit from "../assets/images/image3.jpg";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function DepositConfirm({ inputAmount, setTotalAmount, AddTransaction }) {
    
  const navigate = useNavigate();
  const handleAmount = () => {
    const amount = Number(inputAmount); // convert string to number
    if (!isNaN(amount) && amount > 0) {
      setTotalAmount(prev => prev + amount); // numeric addition

      navigate("/dashboard"); // go to dashboard
    } 
     AddTransaction();
  }

  
const today = new Date();
// Estimated date = today + 2 days
const estimatedDate = new Date(today);
estimatedDate.setDate(today.getDate() + 2);
const formattedEstimatedDate = estimatedDate.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});
 

  return (
    <div className="w-full ">
      <div className="mt-6 p-6 ">
        <h2 className="text-xl font-medium text-center">
          Your deposit has been created
        </h2>
        <img src={deposit} alt="" />
      </div>
      <div className="mt-40 rounded-2xl w-full absolute bottom-0 bg-blue-600 shadow-xl pt-6">
        <div className="flex flex-col p-4">
          {/* Deposit details */}
          <div className="flex justify-between">
            <div className="flex gap-3">
              <CheckCircleIcon className="w-9 h-9 text-white" />
              <div className="flex flex-col">
                <h2 className="font-medium text-white text-lg">Date Created</h2>
                <span className="text-white text-lg">{new Date().toLocaleDateString("en-US",{
                  month:"long",
                  day:"numeric",
                  year:"numeric"
                })}</span>
              </div>
            </div>
            <div>
              <div className="flex flex-col mr-4">
                <h2 className="font-medium text-white text-lg">GH₵ {inputAmount}.00</h2>
                <span className="text-white text-lg">--433</span>
              </div>
            </div>
          </div>
          <div className="ml-4 w-[1px] bg-white mt-2 h-10"></div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <CheckCircleIcon className="w-9 h-9 text-white" />
              <div className="flex flex-col">
                <h2 className="font-medium text-white text-lg">
                  Deposit Initiated
                </h2>
                <span className="text-white text-lg">{new Date().toLocaleDateString("en-US",{
                  month:"long",
                  day:"numeric",
                  year:"numeric"
                })}</span>
              </div>
            </div>
          </div>
          <div className="ml-4 w-[1px] bg-white mt-2 h-10"></div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-blue-800"></div>
              <div className="flex flex-col">
                <h2 className="font-medium text-white text-lg">
                  Estimated Deposit completion
                </h2>
                <span className="text-white text-lg">{formattedEstimatedDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <button
            onClick={handleAmount}
            className="w-full text-lg cursor-pointer text-blue-600 py-3 rounded-full bg-white font-medium">
            Complete
          </button>
          <p className="text-lg text-gray-400 text-center mt-4">View details</p>
        </div>
      </div>
    </div>
  );
}
export default DepositConfirm;