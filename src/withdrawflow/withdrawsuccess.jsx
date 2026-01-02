import { motion } from "framer-motion";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

function WithdrawSuccesss({ totalAmount, amount, selectedMethod,setwithdrawSuccess }) {
  
  const completewithdraw=()=>{
  setwithdrawSuccess(false);

  }

  return (
    <div className=" py-6 flex flex-col items-center fixed top-55 left-4 right-4 bg-white h-100 rounded-lg z-30 shadow-xl ">
      <div className=" w-20 h-20 rounded-full bg-green-200">
        <CheckCircleIcon className="text-green-600" />
      </div>
      <div>
        <h2 className="text-center font-medium mt-5 mb-3 text-2xl">
          Withdrawal successful !
        </h2>
        <div className="flex items-center gap-1 mt-6">
          <p className="font-medium text-lg">{`GH₵ ${Number(amount).toLocaleString()}.00`}</p>
          <span className="text-gray-700 ">
            {`transferred to your ${selectedMethod ||"mobile money"} `}
          </span>
        </div>

       
          <button
          onClick={completewithdraw}
           className="py-3 w-full mt-10 rounded-lg text-white font-medium bg-blue-600">
            Done
          </button>
        

        <div className="flex gap-2 items-center mt-10 justify-center">
          <DocumentTextIcon className="w-6 h-6 text-blue-600" />
          <p className="text-blue-600 font-medium">Transaction detail</p>
        </div>
      </div>
    </div>
  );
}
export default WithdrawSuccesss;
