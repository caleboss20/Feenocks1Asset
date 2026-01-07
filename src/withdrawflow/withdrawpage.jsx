import BackArrow from "../components/Backarrow";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import Ottpverification from "./Ottpverify";
function WithdrawPage({
  selectedMethod,
  totalFunded,
  totalEarned,
  totalWithdrawn,
  withdrawAmount,
  setWithdrawAmount,
  withdrawsuccess,
  setwithdrawSuccess,
  completeWithdrawal,
  confirmedWithdrawAmount,
  setConfirmedWithdrawAmount,
}) {
  const [clicked, setClicked] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [popup, setPopup] = useState(false);
  // ✅ LOCAL STATE FOR WITHDRAWAL METHOD
  const [method, setMethod] = useState(selectedMethod || "");
  const navigate = useNavigate();
  // ===== CALCULATE AVAILABLE BALANCE =====
  const availableBalance = totalFunded + totalEarned - totalWithdrawn;
  // ===== VALIDATE WITHDRAWAL AMOUNT =====
  const validateAmount = (value) => {
    const num = Number(value);
    if (!num || value === "") {
      setError("");
      setIsValid(false);
      return;
    }
    if (num < 100) {
      setError("Minimum withdrawal is GH₵ 100.00");
      setIsValid(false);
      return;
    }
    if (num > 100000) {
      setError("Amount exceeds maximum withdrawal limit of GH₵ 100,000");
      setIsValid(false);
      return;
    }
    if (num > availableBalance) {
      setError(
        `Insufficient balance. Available: GH₵ ${availableBalance.toLocaleString()}.00`
      );
      setIsValid(false);
      return;
    }
    setError("");
    setIsValid(true);
  };
  // ===== HANDLE CONTINUE BUTTON =====
  const handleContinue = () => {
    if (!isValid) {
      setError("Please enter a valid withdrawal amount");
      return;
    }
    if (!method) {
      setError("Please select a withdrawal method");
      return;
    }
    setPopup(true);
  };
  // ===== HANDLE AMOUNT INPUT CHANGE =====
  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setWithdrawAmount(value);
    setClicked(false);
    validateAmount(value);
  };
  // ===== SET AMOUNT TO ALL AVAILABLE BALANCE =====
  const handleAllIn = () => {
    if (availableBalance <= 0) {
      setError("You have no available balance to withdraw");
      return;
    }
    const value = String(availableBalance);
    setClicked(true);
    setWithdrawAmount(value);
    validateAmount(value);
  };
  return (
    <div>
      {/* Header */}
      <div className="p-6 flex gap-4 items-center">
        <Link to="/withdrawmethod"className="mt-4">
          <BackArrow />
        </Link>
        <p className="font-medium text-lg">Withdraw money</p>
      </div>
      {/* Main Content */}
      <div className="p-6">
        {/* Selected Method */}
        <h2 className="text-xl font-medium mb-2">
          {method || "Select a method"}
        </h2>
        {/* Network Selection */}
        <select
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setError("");
          }}
          className="px-3 w-full h-12 mt-4 border-gray-300 border-1 rounded-lg bg-white focus:border-[#e6f2ef] focus:outline-none"
        >
          <option value="">Select network</option>
          <option value="MTN">MTN</option>
          <option value="Telecel">Telecel</option>
          <option value="AirtelTigo">AirtelTigo</option>
        </select>
        {/* Withdrawal Amount Input */}
        <motion.div
          animate={{
            borderColor: focused ? "#2563eb" : error ? "#ef4444" : "#d1d5db",
          }}
          transition={{ duration: 0.25 }}
          className="flex justify-between items-center mt-8 w-full rounded-lg border-2 py-3 px-4"
        >
          <div className="flex flex-col flex-1">
            <span className="text-sm text-gray-500">Withdraw amount</span>
            <input
              type="number"
              value={withdrawAmount}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="GH₵ 100.00"
              className="text-lg h-12 w-full border-none outline-none bg-transparent"
            />
          </div>
          <div
            onClick={handleAllIn}
            className="flex gap-2 items-center cursor-pointer ml-4"
          >
            <p className="text-[#2f5d50] font-medium text-sm whitespace-nowrap">
              All in
            </p>
            {clicked ? (
              <CheckCircleIcon className="w-6 h-6 text-blue-700 flex-shrink-0" />
            ) : (
              <PlusCircleIcon className="w-6 h-6 text-[#2f5d50] flex-shrink-0" />
            )}
          </div>
        </motion.div>
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-red-500 text-sm mt-3"
          >
            <MdErrorOutline className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
        {/* Available Balance Info */}
        <div className="flex gap-4 items-center mt-8">
          <h2 className="text-md text-gray-700">Available balance:</h2>
          <h2 className="font-medium text-lg text-[#2f5d50]">
            GH₵ {Number(availableBalance).toLocaleString()}.00
          </h2>
        </div>
        {/* Continue Button */}
        <motion.button
          onClick={handleContinue}
          disabled={!isValid}
          animate={{
            backgroundColor: isValid ? "#2f5d5" : "#d1d5db",
          }}
          whileHover={isValid ? { backgroundColor: "bg-[#2f5d50]" } : {}}
          className="py-3 w-full mt-10 rounded-lg text-white font-medium disabled:cursor-not-allowed transition-all"
        >
          Continue
        </motion.button>
        {/* Info Box */}
        <div className="gap-3 flex py-4 px-3 w-full rounded-lg bg-blue-50 mt-8">
          <MdErrorOutline className="mt-0.5 w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <h2 className="font-medium text-md text-gray-800">
              Important Information
            </h2>
            <span className="text-sm text-gray-700 block mt-1">
              Withdrawals are processed within 24-48 hours to your selected
              mobile money account. Make sure your account details are correct
              before confirming.
            </span>
          </div>
        </div>
        {/* OTP Verification Popup */}
        {popup && (
          <>
            <div
              onClick={() => setPopup(false)}
              className="fixed top-0 bottom-0 right-0 inset-0 bg-black/60 w-full z-20"
            ></div>
            <Ottpverification
              withdrawAmount={withdrawAmount}
              selectedMethod={method}
              availableBalance={availableBalance}
              withdrawsuccess={withdrawsuccess}
              setwithdrawSuccess={setwithdrawSuccess}
              setPopup={setPopup}
              completeWithdrawal={completeWithdrawal}
              confirmedWithdrawAmount={confirmedWithdrawAmount}
              setConfirmedWithdrawAmount={setConfirmedWithdrawAmount}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default WithdrawPage;