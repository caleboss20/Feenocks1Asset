import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
function WithdrawSuccesss({
  withdrawAmount,
  selectedMethod,
  setwithdrawSuccess,
  confirmedWithdrawAmount,
}) {
  const navigate = useNavigate();
  //  CLOSE MODAL & GO TO DASHBOARD (NO MONEY LOGIC HERE)
  const handleDone = () => {
    setwithdrawSuccess(false);
    navigate("/dashboard");
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="py-7 px-6 flex flex-col items-center fixed top-20 left-4 right-4 bg-white rounded-xl z-30 shadow-2xl"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
      >
        <CheckCircleIcon className="w-12 h-12 text-green-600" />
      </motion.div>
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-center font-semibold mt-6 mb-4 text-2xl text-gray-800">
          Withdrawal Successful!
        </h2>
        {/* Withdrawal Amount */}
        <div className="flex items-center gap-2 mt-6 justify-center text-center">
          <p className="text-4xl font-bold text-green-800">
            {`GH₵ ${Number(confirmedWithdrawAmount).toLocaleString()}.00`}
            {/* GH₵ 100,000 */}
          </p>
        </div>
        {/* Method */}
        <div className="mt-3 text-center">
          <span className="text-gray-700 text-sm">
            {`Transferred to your ${selectedMethod || "mobile money account"}`}
          </span>
        </div>
        {/* Processing Info */}
        <div className="bg-blue-50 rounded-lg border-blue-500 p-4 mt-6 ">
          <p className=" text-gray-700">
            <span className="text-blue-600">Processing:</span>{" "}
            <span className="text-sm">Your withdrawal will be processed within 24 to 48 hours. 
              You'll receive a confirmation SMS.</span>
          </p>
        </div>
        {/* Done Button */}
        <motion.button
          onClick={handleDone}
          whileHover={{ backgroundColor: "#1d4ed8" }}
          className="py-3 w-full mt-8 rounded-lg text-white font-semibold bg-blue-600 transition-all"
        >
          Done
        </motion.button>
        {/* Transaction Details */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex gap-2 items-center mt-8 justify-center cursor-pointer"
        >
          <DocumentTextIcon className="w-5 h-5 text-blue-600" />
          <p className="text-blue-600 font-medium hover:underline">
            View transaction details
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
export default WithdrawSuccesss;