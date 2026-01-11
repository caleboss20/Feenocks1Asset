import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import BackArrow from "./components/Backarrow";
import ChatHelp from "./components/chatHelp";
import { motion } from "framer-motion";
import signInwithGoogle from "./Config/auth"


export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
 


  const handleEmailSignIn = () => {
    setError("");
    const storedData = JSON.parse(localStorage.getItem("signupData"));
    if (!storedData) {
      setError("No registered users found. Please sign up first.");
      return;
    }
    if (
      emailInput.trim() === storedData.email &&
      passwordInput.trim() === storedData.password
    ) {
      // Determine if returning user
      const storedPIN = localStorage.getItem("userPIN");
      const isReturningUser = storedPIN ? true : false;
      const username = storedData.username || "User"; // optional username
      setShowSpinner(true);
      setTimeout(() => {
        navigate("/setpin", { state: { isReturningUser, username } });
      }, 10000); // show spinner for 10 seconds
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="w-full h-screen p-4 bg-white flex justify-center items-start relative">
      <div className="absolute left-5 top-10" onClick={() => navigate("/")}>
        <BackArrow />
      </div>
      <div className="mt-20 p-4 w-full max-w-md">
        <h2 className="text-3xl">Welcome Back</h2>
        <p className="text-gray-700 text-xl mt-6">
          New user?
          <Link to="/signup">
            <span className="ml-3 text-[#2f5d50] font-medium">Create account</span>
          </Link>
        </p>
        {error && (
          <div className="mt-6 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        <button
          onClick={signInwithGoogle}
          disabled={loading}
          className="mt-10 flex items-center justify-center gap-4 w-full h-14 border border-gray-400 rounded-lg disabled:opacity-60"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-lg font-medium">
            {loading ? "Opening Google..." : "Sign in with Google"}
          </span>
        </button>
        <div className="flex items-center my-8">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <input
          placeholder="Email Address"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="w-full h-14 border border-gray-400 rounded-lg px-4 mb-4 text-lg"
        />
        <input
          placeholder="Password"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="w-full h-14 border rounded-lg border-gray-400 px-4 mb-4 text-lg"
        />
        <span className="text-[#2f5d50] font-medium mb-4 block">Forgot password?</span>
        <button
          onClick={handleEmailSignIn}
          className="w-full h-14 bg-[#2f5d50] rounded-lg text-white text-lg mt-2"
        >
          Continue
        </button>
        
        {/* <ChatHelp /> */}
      </div>
      {showSpinner && (
      <>
         <div className="fixed inset-0 bg-black/40 flex gap-7 flex-col items-center justify-center">
          <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
         <motion.p
            className=" text-white text-2xl font-bold"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Logging in...
          </motion.p>
        </div>
        
      </>
      )}
    </div>
  );
}