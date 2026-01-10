import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCircleIcon,XMarkIcon, } from "@heroicons/react/24/outline";
import { MdLogout } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { FaHeart} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
/* =======================
   HASH HELPER (BROWSER)
======================= */
//========using SHA-256===============//
async function hashPIN(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
const PINPage = ({profileName}) => {
  const navigate = useNavigate();
  const PIN_LENGTH = 4;
  const storedPINHash = localStorage.getItem("userPIN");
  const isReturningUser = Boolean(storedPINHash);
  const [step, setStep] = useState(isReturningUser ? "enter" : "create");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [attempts, setAttempts] = useState(5);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showpopup,setshowpopup]=useState(false);
   const [overlay,setOverlay]=useState(false);

  /* =======================/
     NUMPAD HANDLERS
  ======================= */
  const handleNumpadClick = (num) => {
    if (loading) return;
    if (isReturningUser || step === "enter" || step === "create") {
      if (pin.length < PIN_LENGTH) setPin(p => p + num);
    } else if (step === "confirm") {
      if (confirmPin.length < PIN_LENGTH) setConfirmPin(p => p + num);
    }
  };
  const handleBackspace = () => {
    if (loading) return;
    if (isReturningUser || step === "enter" || step === "create") {
      setPin(p => p.slice(0, -1));
    } else {
      setConfirmPin(p => p.slice(0, -1));
    }
  };
  /* =======================
     AUTO FLOW LOGIC
  ======================= */
  useEffect(() => {
    /* ===== RETURNING USER ===== */
    if (isReturningUser && pin.length === PIN_LENGTH) {
      (async () => {
        const hashedInput = await hashPIN(pin);
        if (hashedInput === storedPINHash) {
          setError("");
          setLoading(true);
          setTimeout(() => navigate("/dashboard"), 5000);
        } else {
          const remaining = attempts - 1;
          setAttempts(remaining);
          setPin("");
          if (remaining > 0) {
            setError(`Incorrect PIN. ${remaining} attempt(s) left.`);
          } else {
            setError("Too many failed attempts. Logging out...");
            setTimeout(() => {
              
              navigate("/signin");
            }, 2000);
          }
        }
      })();
    }
    /* ===== NEW USER ===== */
    if (!isReturningUser) {
      if (step === "create" && pin.length === PIN_LENGTH) {
        setStep("confirm");
      }
      if (step === "confirm" && confirmPin.length === PIN_LENGTH) {
        if (pin === confirmPin) {
          (async () => {
            const hashedPin = await hashPIN(pin);
            localStorage.setItem("userPIN", hashedPin);
            setError("");
            setLoading(true);
            setTimeout(() => navigate("/dashboard"), 5000);
          })();
        } else {
          setError("PINs do not match. Try again.");
          setPin("");
          setConfirmPin("");
          setStep("create");
        }
      }
    }
  }, [pin, confirmPin]);
  const activePin =
    isReturningUser || step === "enter" || step === "create" ? pin : confirmPin;
 
 
   const showOverlay=()=>{
  setshowpopup(false);
  setOverlay(true);
  const timer=setTimeout(() => {
    navigate("/signin");
  }, 4000);
   }
 
 
    return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-b from-[#e6f2ef] via-white to-[#e6f2ef] ${
        loading ? "pointer-events-none" : ""
      }`}
    >
      {/* MAIN */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-[#2f5d50] flex items-center justify-center mb-6"
        >
          <UserCircleIcon className="w-12 h-12 text-white" />
        </motion.div>
        <h1 className="text-lg font-medium text-gray-900 mb-4 text-center">
          {isReturningUser
            ? `Welcome back ${profileName||""}, 
            enter your PIN`
            : step === "create"
            ? "Create a PIN to continue"
            : "Repeat your PIN"}
        </h1>
        {/* PIN DOTS */}
        <div className="flex gap-8 mb-6">
          {[...Array(PIN_LENGTH)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: activePin[i] ? 1.2 : 1,
                backgroundColor: activePin[i] ? "#10b981" : "#9ca3af",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-3.5 h-3.5 rounded-full"
            />
          ))}
        </div>
        {/* ERROR */}
        {error && (
          <motion.div 
           initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type:"spring", stiffness: 1000 }}
          className="flex items-center gap-2 text-red-500 mb-4">
            <AiOutlineWarning />
            <span className="text-sm font-medium">{error}</span>
          </motion.div>
        )}
        {/* NUMPAD */}
        <div className="grid grid-cols-3 gap-7 mt-6">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button
              key={n}
              onClick={() => handleNumpadClick(n)}
              className="w-16 h-16 rounded-full bg-gray-200 text-2xl"
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => handleNumpadClick(0)}
            className="w-16 h-16 rounded-full bg-gray-200 text-2xl col-start-2"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="w-16 h-16 rounded-full bg-gray-200 text-xl"
          >
            ⌫
          </button>
        </div>
      </div>
      {/* SIGN OUT */}
      <div className="pb-6 flex justify-center">
        <button
          onClick={()=>setshowpopup(true)}
          className="flex items-center gap-2 text-gray-500"
        >
          <MdLogout size={18} />
          Log out
        </button>
      </div>

      {/**show overlay */}
    {overlay && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="rounded-full h-16 w-16 border-t-4 border-b-4 border-green-800 border-blue-500 mb-6"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          />
          <motion.p
            className="text-white text-2xl font-bold"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Logging out...
          </motion.p>
        </motion.div>
      )}
       

      {/**show popup confirm sign out */}
     
      {showpopup && 
      <>
       <div 
       onClick={()=>setshowpopup(false)}
       className="z-10 fixed top-0 bottom-0 right-0 inset-0 bg-black/50 w-full "></div>
       <div className="p-6 fixed left-0 right-0 h-[320px] bg-white bottom-0 shadow-2xl rounded-l-xl rounded-r-xl z-30">
         <div 
         className="flex items-center justify-between">
          <div 
          onClick={()=>setshowpopup(false)} >
             <XMarkIcon className="w-6 h-6 text-black font-medium"/>
          </div>
         
          <h2 className="text-red-500 font-medium text-lg text-center -ml-4">Logout</h2>
         <div></div>
         </div>
         <div className="w-full h-[1px] bg-gray-100 mt-5">

         </div>

         <div className="flex gap-3 flex-col items-center justify-center mt-7">
          <h2 className="text-lg font-medium">Are you sure you want to Log out?</h2>
         <p className="flex items-center gap-2 justify-center">Thank you and see you again<FaHeart className="text-red-500"/></p>
         </div>

         <div className="flex gap-5 mt-10 w-full">
          <button
          onClick={()=>setshowpopup(false)} 
          className="flex-1 bg-green-50 rounded-full py-3 text-green-600 font-medium text-lg">cancel</button>
          <button
          onClick={showOverlay}
           className="flex-1 bg-green-800 rounded-full py-3 text-white font-medium text-lg">Yes,logout</button>
         </div>
      
      </div>
      </>
      }
      
      {/* LOADING OVERLAY */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            className="rounded-full h-16 w-16 border-t-4 border-teal-600 mb-6"
          />
          <p className="text-white text-2xl font-bold">Feenicks1</p>
        </div>
      )}
    </div>
  );
};
export default PINPage;