import deposit from "../assets/images/image3.jpg";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function DepositConfirm({ inputAmount, AddTransaction,transactions, setTransactions }) {
  const [loading,setLoading]=useState(false);

    
  const navigate = useNavigate();
  const handleAmount = () => {
    if(loading) return;
    const amount = Number(inputAmount); // convert string to number
    if (isNaN(amount) || amount <=0) 
      return;
    setLoading(true);
     AddTransaction();

     
     

   
     setTimeout(()=>{
      navigate("/dashboard");
     },0);
   
    
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
        <div className="flex justify-center">
          <img src={deposit} alt=""className="w-50 h-50 mt-5" />
        </div>
        
      </div>
      <div className="mt-40 rounded-2xl w-full absolute bottom-0 bg-blue-600 shadow-xl pt-2">
        <div className="flex flex-col p-4">
          {/* Deposit details */}
          <div className="flex justify-between">
            <div className="flex gap-3">
              <CheckCircleIcon className="w-7 h-7 text-white" />
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
          <div className="ml-4 w-[1px] bg-white mt-2 h-7"></div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <CheckCircleIcon className="w-7 h-7 text-white" />
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
          <div className="ml-4 w-[1px] bg-white mt-2 h-7"></div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full border-2 border-blue-800"></div>
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
          disabled={loading}
            onClick={handleAmount}
            className="w-full text-lg cursor-pointer text-blue-600 py-3 rounded-full bg-white font-medium">
            {loading ?"processing...":"complete"}
          </button>
          <p className="text-lg text-gray-400 text-center mt-4">View details</p>
        </div>
      </div>
    </div>
  );
}
export default DepositConfirm;