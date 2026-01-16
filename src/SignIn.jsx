import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import BackArrow from "./components/Backarrow";
import { motion } from "framer-motion";
import { signInWithGoogle, handleGoogleRedirect } from "./Config/auth";
import { getAdditionalUserInfo } from "firebase/auth";
export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  // Handle mobile redirect return
  useEffect(() => {
    const finishGoogleLogin = async () => {
      try {
        const result = await handleGoogleRedirect();
        if (!result) return;
        const info = getAdditionalUserInfo(result);
        if (info?.isNewUser) {
          // New Google user → onboarding
          navigate("/");
        } else {
          // Returning Google user → PIN setup
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Redirect login error:", err);
        setError("Google login failed. Please try again.");
      }
    };
    finishGoogleLogin();
  }, [navigate]);
  // Google login button
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      if (!result) return; // mobile redirect
      const info = getAdditionalUserInfo(result);
      if (info?.isNewUser) {
        navigate("/");
      } else {
        navigate("/setpin");
      }
    } catch (err) {
      console.error(err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // Email/password login
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
      const storedPIN = localStorage.getItem("userPIN");
      const isReturningUser = storedPIN ? true : false;
      const username = storedData.username || "User";
      setShowSpinner(true);
      setTimeout(() => {
        navigate("/setpin", { state: { isReturningUser, username } });
      }, 3000); // reduced spinner to 3 seconds
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="w-full h-screen p-4 bg-white flex justify-center items-start relative">
      <div
        className="absolute left-5 top-10 cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        <BackArrow />
      </div>
      <div className="mt-20 p-4 w-full max-w-md">
        <h2 className="text-2xl font-small">Welcome Back</h2>
        <p className="text-gray-700 text-xl mt-6">
          New user?
          <Link to="/signup">
            <span className="ml-3 text-[#2f5d50] font-medium">
              Create account
            </span>
          </Link>
        </p>
        {error && (
          <div className="mt-6 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {/* Google Sign-In */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-10 flex items-center justify-center gap-4 w-full h-14 border border-gray-400 rounded-lg disabled:opacity-60"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-lg font-medium">
            {loading ? "Redirecting..." : "Continue with Google"}
          </span>
        </button>
        <div className="flex items-center my-8">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        {/* Email/Password Login */}
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
        <span
          onClick={() => navigate("/passwordreset")}
          className="text-[#2f5d50] font-medium mb-4 block cursor-pointer"
        >
          Forgot password?
        </span>
        <button
          onClick={handleEmailSignIn}
          className="w-full h-14 bg-[#2f5d50] rounded-lg text-white text-lg mt-2"
        >
          Continue
        </button>
      </div>
      {showSpinner && (
        <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center gap-7">
          <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          <motion.p
            className="text-white text-2xl font-bold"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Logging in...
          </motion.p>
        </div>
      )}
    </div>
  );
}