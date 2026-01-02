import BackArrow from "../components/Backarrow";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { MdErrorOutline } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import Ottpverification from "./Ottpverify";

function WithdrawPage({
  selectedMethod,
  totalAmount,
  withdrawsuccess,
  setwithdrawSuccess,
  amount,setAmount
}) {
  const [clicked, setclicked] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const validateAmount = (value) => {
    const num = Number(value);
    if (!num) {
      setError("");
      setIsValid(false);
      return;
    }
    if (num < 100) {
      setError("Minimum withdrawal is GH₵100");
      setIsValid(false);
      return;
    }
    if (num > 100000) {
      setError("Amount exceeds withdrawal limit");
      setIsValid(false);
      return;
    }
    if (num > totalAmount) {
      setError("Insufficient balance");
      setIsValid(false);
      return;
    }
    setError("");
    setIsValid(true);
  };

  const handlecontinue = () => {
    if (!isValid) return;
    setPopup(true);
   
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
    setclicked(false);
    validateAmount(value);
     console.log(amount);
  };
  const handleAllIn = () => {
    const value = String(totalAmount);
    setclicked(true);
    setAmount(value);
    validateAmount(value);
  };
  return (
    <div>
      <div className="p-6 flex gap-18">
        <Link to="/withdrawmethod">
          <BackArrow />
        </Link>
        <p className="font-medium text-lg">Withdraw money</p>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-medium">{selectedMethod}</h2>
        <select className="px-2 w-full h-15 mt-7 border-gray-500 border-1 rounded-lg">
          <option>MTN</option>
          <option>Telecel</option>
        </select>
        {/* Withdraw box */}
        <motion.div
          animate={{
            borderColor: focused ? "#2563eb" : "#9ca3af",
          }}
          transition={{ duration: 0.25 }}
          className="flex justify-between mt-8 w-full rounded-lg border-2 py-3 px-2"
        >
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Withdraw amount</span>
            <input
              value={amount}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="GH₵ 100.00"
              className="text-lg h-12 w-40 border-none outline-none"
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-blue-700 font-medium">All in</p>
            <div onClick={handleAllIn}>
              {clicked ? (
                <CheckCircleIcon className="w-7 h-7 text-blue-700" />
              ) : (
                <PlusCircleIcon className="w-7 h-7 text-blue-700" />
              )}
            </div>
          </div>
        </motion.div>
        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mt-2"
          >
            {error}
          </motion.p>
        )}
        <div className="flex gap-4 items-center mt-6">
          <h2 className="text-md text-gray-700">Available withdraw balance:</h2>
          <h2 className="font-medium text-lg">
            GH₵ {Number(totalAmount).toLocaleString()}.00
          </h2>
        </div>
        {/* Button */}
        <motion.button
          onClick={handlecontinue}
          disabled={!isValid}
          animate={{
            backgroundColor: isValid ? "#2563eb" : "#9ca3af",
            filter: isValid ? "blur(0px)" : "blur(1px) ",
          }}
          className="py-3 w-full mt-20 rounded-lg text-white font-medium"
        >
          Continue
        </motion.button>
        <div className="gap-3 flex py-3 px-2 w-full rounded-lg bg-blue-50 mt-10">
          <MdErrorOutline className="mt-1 w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <h2 className="font-medium text-md">
              Why do I need to make a deposit?
            </h2>
            <span className="text-sm text-gray-800">
              Make a deposit to link and verify your bank account. For your
              safety, only withdrawals to verified accounts are permitted.
            </span>
          </div>
        </div>

        {popup ? (
          <>
            <div
              onClick={() => setPopup(false)}
              className="fixed top-0 bottom-0 right-0 inset-0 bg-black/50 w-full z-20"
            ></div>
            <Ottpverification
              withdrawsuccess={withdrawsuccess}
              setwithdrawSuccess={setwithdrawSuccess}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
export default WithdrawPage;
