import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Ottpverification({withdrawsuccess,setwithdrawSuccess}) {
 const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [countdown, setCountdown] = useState(30);
  const [shake, setShake] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const inputsRef = useRef([]);
  const generatedOtpRef = useRef(null);
  // 🔢 Generate OTP
  useEffect(() => {
    generateOtp();
  }, []);
  const generateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    generatedOtpRef.current = code;
    console.log("Generated OTP:", code);
    setCountdown(30);
  };
  // ⏱ Countdown
  useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value) || verifying) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  const isOtpComplete = otp.every((d) => d !== "");
  const handleButtonClick = () => {
    if (verifying) return;
    if (!isOtpComplete) {
      if (countdown === 0) generateOtp();
      return;
    }
    const enteredOtp = otp.join("");
    if (enteredOtp !== String(generatedOtpRef.current)) {
      triggerShake();
      return;
    }
    setVerifying(true);
    // setSuccess(true);
    setwithdrawSuccess(true);
    setTimeout(() => {
      navigate("/dashboard"); // 🔁 change route if needed
    }, 3000);
  };
  return (
    <div>
      <div className="absolute top-55 left-2 right-2 bg-white h-130 rounded-lg z-30 shadow-xl p-4">
        <h2 className="mb-3 font-bold text-2xl leading-normal">
          Enter the code we texted to +** ****76
        </h2>
        <span className="text-black">{}</span>
        <span className="text-gray-600">
          This helps us keep your account secure by verifying that's it's really
          you.
        </span>
        
       
       <motion.div
        animate={shake ? { x: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.4 }}
        className={`flex gap-3 mt-10 `}
      >
        {otp.map((digit, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            value={digit}
            disabled={verifying}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className={` w-12 h-13 text-center text-xl font-medium border-2 rounded-lg outline-none `}
            animate={{
              borderColor: digit ? "#2563eb" : "#d1d5db",
            }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </motion.div>
        
        
      {/* Button */}
      <motion.button
        onClick={handleButtonClick}
        disabled={verifying}
        animate={{
          backgroundColor:
            verifying || isOtpComplete ? "#2563eb" : "#e5e7eb",
          color:
            verifying || isOtpComplete ? "#ffffff" : "#6b7280",
        }}
        className="mt-15 w-full py-3 rounded-lg font-medium flex justify-center items-center gap-2"
      >
        {verifying ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
            Verifying…
          </>
        ) : isOtpComplete ? (
          "Verify"
        ) : countdown === 0 ? (
          "Resend code"
        ) : (
          `Resend code in ${countdown}s`
        )}
      </motion.button>

      <p className="text-center mt-8 font-medium text-blue-700">Try another way </p>


      </div>
    </div>
  );
}
export default Ottpverification;
