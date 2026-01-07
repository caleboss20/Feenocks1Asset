import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import deposit1 from "./assets/images/deposit1.png";
import BackArrow from "./components/Backarrow";
function DepositSection({walletName,setWalletName,profileName,setProfileName}) {
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);
  const handleContinue = () => {
    setTouched(true);
    if (walletName.trim() && profileName.trim()) {
      navigate("/setpin");
    }
  };
  const shakeAnimation = {
    shake: {
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.4 },
    },
  };
  const walletInvalid = touched && !walletName.trim();
  const profileInvalid = touched && !profileName.trim();
  const inputWrapperClass = "relative mb-8";
  const iconClass = "absolute right-3 top-17 transform -translate-y-1/2 text-red-500 w-6 h-6";
  return (
    <div className="w-full py-6 px-6 mb-10">
      <div className="flex mb-4 mt-0">
        <div onClick={() => navigate("/recommendation")}>
          <BackArrow />
        </div>
        <div className="flex items-start">
        <img src={deposit1} alt="Deposit" className="w-50 h-50" />
        </div>
        
      </div>
      <h2 className="font-medium text-2xl leading-normal text-center">
        Welcome to your wallet!
      </h2>
      <p className="text-center mt-4 text-gray-700 text-md">
        Let’s set up your Feenicks1 wallet. Every deposit powers your investments
        and builds your financial future.
      </p>
      <div className="mt-8">
        <motion.div
          animate={walletInvalid ? "shake" : ""}
          variants={shakeAnimation}
          className={inputWrapperClass}
        >
          <label className={`text-md font-small mb-1 block ${walletInvalid ? "text-red-500" : "text-gray-700"}`}>
            Wallet Name
          </label>
          <input
            type="text"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            placeholder="My growth wallet"
            className={`pl-5 text-md w-full border-1 py-3 mt-2 rounded-lg ${walletInvalid ? "border-red-500" : "border-gray-600"}`}
          />
          {walletInvalid && <HiOutlineExclamationCircle className={iconClass} />}
        </motion.div>
        <motion.div
          animate={profileInvalid ? "shake" : ""}
          variants={shakeAnimation}
          className={inputWrapperClass}
        >
          <label className={`text-md font-small mb-1 block ${profileInvalid ? "text-red-500" : "text-gray-700"}`}>
            Profile Name
          </label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Profile Name"
            className={`pl-5 text-md w-full border-1 py-3 mt-2 rounded-lg ${profileInvalid ? "border-red-500" : "border-gray-600"}`}
          />
          {profileInvalid && 
          <div className="">
            <HiOutlineExclamationCircle className={iconClass} />
          </div>}
          
        </motion.div>
      </div>
      <button
        onClick={handleContinue}
        className="text-md font-medium py-3 px-4 w-full mt-5 rounded-lg bg-[#0b3c39] text-white"
      >
        Let's get started
      </button>
    </div>
  );
}
export default DepositSection;