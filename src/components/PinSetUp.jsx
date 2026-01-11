import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MdLogout } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
/* =========================================================
   SECURITY: CLIENT-SIDE PIN HASHING (SHA-256)
   - Prevents storing raw PIN in localStorage
   - Mimics real-world fintech PIN protection
========================================================= */
async function hashPIN(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
const PINPage = ({ profileName }) => {
  const navigate = useNavigate();
  /* =========================================================
     CONFIGURATION
     - PIN length
     - Foreground lock timeout (auto-lock on inactivity)
  ========================================================= */
  const PIN_LENGTH = 4;
  const LOCK_TIMEOUT = 30 * 1000; // 30 seconds
  /* =========================================================
     SESSION & AUTH STATE
  ========================================================= */
  const storedPINHash = localStorage.getItem("userPIN");
  const isReturningUser = Boolean(storedPINHash);
  const [step, setStep] = useState(isReturningUser ? "enter" : "create");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [attempts, setAttempts] = useState(5);
  const [error, setError] = useState("");
  /* =========================================================
     UX / SECURITY STATES
  ========================================================= */
  const [authenticating, setAuthenticating] = useState(false); // Text phase
  const [loading, setLoading] = useState(false); // Spinner phase
  const [overlay, setOverlay] = useState(false); // Logout overlay
  const [sessionLocked, setSessionLocked] = useState(false); // Foreground recheck
  const [showpopup, setshowpopup] = useState(false); // Logout confirm popup
  /* =========================================================
     INPUT CONTROL (NUMPAD)
     - Disabled during auth, loading, or overlays
  ========================================================= */
  const handleNumpadClick = (num) => {
    if (loading || authenticating || overlay) return;
    if (isReturningUser || step === "enter" || step === "create") {
      if (pin.length < PIN_LENGTH) setPin(p => p + num);
    } else {
      if (confirmPin.length < PIN_LENGTH) setConfirmPin(p => p + num);
    }
  };
  const handleBackspace = () => {
    if (loading || authenticating || overlay) return;
    if (isReturningUser || step === "enter" || step === "create") {
      setPin(p => p.slice(0, -1));
    } else {
      setConfirmPin(p => p.slice(0, -1));
    }
  };
  /* =========================================================
     FOREGROUND PIN RECHECK (AUTO-LOCK)
     - Locks app when tab/app goes to background
     - Forces PIN re-entry when user returns after timeout
  ========================================================= */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem("lastActiveTime", Date.now().toString());
      }
      if (document.visibilityState === "visible") {
        const lastActive = Number(localStorage.getItem("lastActiveTime"));
        const now = Date.now();
        if (lastActive && now - lastActive > LOCK_TIMEOUT) {
          setSessionLocked(true);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);
  /* =========================================================
     FORCE PIN SCREEN WHEN SESSION IS LOCKED
  ========================================================= */
  useEffect(() => {
    if (sessionLocked) {
      setPin("");
      setConfirmPin("");
      setAuthenticating(false);
      setLoading(false);
      navigate("/setpin", { replace: true });
    }
  }, [sessionLocked]);
  /* =========================================================
     AUTH FLOW LOGIC
     - Returning user PIN validation
     - New user PIN creation
     - Retry limits & forced logout
  ========================================================= */
  useEffect(() => {
    // RETURNING USER
    if (isReturningUser && pin.length === PIN_LENGTH) {
      (async () => {
        const hashedInput = await hashPIN(pin);
        if (hashedInput === storedPINHash) {
          setSessionLocked(false); // unlock session
          setError("");
          setAuthenticating(true);
          setTimeout(() => {
            setAuthenticating(false);
            setLoading(true);
          }, 6000);
          setTimeout(() => {
            navigate("/dashboard");
          }, 10000);
        } else {
          const remaining = attempts - 1;
          setAttempts(remaining);
          setPin("");
          if (remaining > 0) {
            setError(`Incorrect PIN. ${remaining} attempt(s) left.`);
          } else {
            setError("Too many failed attempts. Logging out...");
            setTimeout(() => navigate("/signin"), 2000);
          }
        }
      })();
    }
    // NEW USER
    if (!isReturningUser) {
      if (step === "create" && pin.length === PIN_LENGTH) {
        setStep("confirm");
      }
      if (step === "confirm" && confirmPin.length === PIN_LENGTH) {
        if (pin === confirmPin) {
          (async () => {
            const hashedPin = await hashPIN(pin);
            localStorage.setItem("userPIN", hashedPin);
            setSessionLocked(false); // unlock session
            setAuthenticating(true);
            setTimeout(() => {
              setAuthenticating(false);
              setLoading(true);
            }, 3000);
            setTimeout(() => {
              navigate("/dashboard");
            }, 5000);
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
  /* =========================================================
     UI CONTROL HELPERS
  ========================================================= */
  const activePin =
    isReturningUser || step === "enter" || step === "create"
      ? pin
      : confirmPin;
  const hideSensitiveUI = loading || authenticating || overlay;
  /* =========================================================
     LOGOUT FLOW
  ========================================================= */
  const showOverlayHandler = () => {
    setshowpopup(false);
    setOverlay(true);
    setTimeout(() => {
      navigate("/signin");
    }, 4000);
  };
  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-b from-[#e6f2ef] via-white to-[#e6f2ef] ${loading ? "pointer-events-none" : ""}`}>
      {/* ================= MAIN PIN SCREEN ================= */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-[#2f5d50] flex items-center justify-center mb-6"
        >
          <UserCircleIcon className="w-12 h-12 text-white" />
        </motion.div>
        {!hideSensitiveUI && (
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg font-medium text-gray-900 mb-4 text-center"
          >
            {isReturningUser
              ? `Welcome back ${profileName || ""}, enter your PIN`
              : step === "create"
              ? "Create a PIN to continue"
              : "Repeat your PIN"}
          </motion.h1>
        )}
        {authenticating && !loading && (
          <p className="text-lg font-medium text-gray-900 mb-4">
            Authenticating, please wait...
          </p>
        )}
        {!hideSensitiveUI && (
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
        )}
        {error && !hideSensitiveUI && (
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <AiOutlineWarning />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}
        <div className="grid grid-cols-3 gap-7 mt-6">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => handleNumpadClick(n)} className="w-16 h-16 rounded-full bg-gray-200 text-2xl">{n}</button>
          ))}
          <button onClick={() => handleNumpadClick(0)} className="w-16 h-16 rounded-full bg-gray-200 text-2xl col-start-2">0</button>
          <button onClick={handleBackspace} className="w-16 h-16 rounded-full bg-gray-200 text-xl">⌫</button>
        </div>
      </div>
      {/* ================= LOGOUT BUTTON ================= */}
      <div className="pb-6 flex justify-center">
        <button onClick={() => setshowpopup(true)} className="flex items-center gap-2 text-gray-500">
          <MdLogout size={18} />
          Log out
        </button>
      </div>
      {/* ================= LOGOUT CONFIRM POPUP ================= */}
      {showpopup && (
        <>
          <div
            onClick={() => setshowpopup(false)}
            className="z-10 fixed top-0 bottom-0 right-0 inset-0 bg-black/50 w-full "
          ></div>
          <div className="p-6 fixed left-0 right-0 h-[320px] bg-white bottom-0 shadow-2xl rounded-l-xl rounded-r-xl z-30">
            <div className="flex items-center justify-between">
              <div onClick={() => setshowpopup(false)}>
                <XMarkIcon className="w-6 h-6 text-black font-medium" />
              </div>
              <h2 className="text-red-500 font-medium text-lg text-center -ml-4">Logout</h2>
              <div></div>
            </div>
            <div className="w-full h-[1px] bg-gray-100 mt-5"></div>
            <div className="flex gap-3 flex-col items-center justify-center mt-7">
              <h2 className="text-lg font-medium">Are you sure you want to Log out?</h2>
              <p className="flex items-center gap-2 justify-center">
                Thank you and see you again<FaHeart className="text-red-500" />
              </p>
            </div>
            <div className="flex gap-5 mt-10 w-full">
              <button onClick={() => setshowpopup(false)} className="flex-1 bg-green-50 rounded-full py-2 text-green-600 font-medium text-lg">cancel</button>
              <button onClick={showOverlayHandler} className="flex-1 bg-green-800 rounded-full py-2 text-white font-medium text-md">Yes,logout</button>
            </div>
          </div>
        </>
      )}
      {/* ================= LOGOUT SPINNER OVERLAY ================= */}
      {overlay && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center gap-6">
          <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          <motion.p className="text-white text-2xl font-bold" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Logging out...</motion.p>
        </div>
      )}
      {/* ================= PIN LOADING SPINNER ================= */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};
export default PINPage;