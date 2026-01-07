import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import BackArrow from "./components/Backarrow";
import ChatHelp from "./components/chatHelp";
import { motion } from "framer-motion";
import { signInWithGoogle, handleRedirectResult } from "./Config/auth";
export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const checkRedirect = async () => {
      const result = await handleRedirectResult();
      if (result && result.success === false && result.error) {
        setError(result.error);
      }
    };
    checkRedirect();
  }, []);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle(false);
      if (result && result.success === false) {
        setError(result.error || "Failed to sign in with Google");
      } else {
        // Normally you'd handle Google login data here
        // Example: store user in localStorage
      }
    } catch (err) {
      setError("Something went wrong during sign-in");
    } finally {
      setLoading(false);
    }
  };
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
      }, 2000); // show spinner for 2 seconds
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
          onClick={handleGoogleSignIn}
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
        <ChatHelp />
      </div>
      {showSpinner && (
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
            Logging in...
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}