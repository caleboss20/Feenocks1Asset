import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import BackArrow from "./components/Backarrow";
import ChatHelp from "./components/chatHelp";
import { signInWithGoogle, handleRedirectResult } from "./Config/auth";
export default function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Handle redirect result (for mobile / redirect flow)
  useEffect(() => {
    const checkRedirect = async () => {
      const result = await handleRedirectResult();
      if (result?.error) {
        setError(result.error);
      }
    };
    checkRedirect();
  }, []);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle(false); // false = sign-in
      if (!result.success) {
        setError(result.error || "Failed to sign in with Google");
      }
      // Don’t navigate here — onAuthStateChange will redirect
    } catch (err) {
      setError("Something went wrong during sign-in");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen p-4 bg-white flex justify-center items-start relative">
      <div className="absolute left-5 top-10" onClick={() => navigate("/")}>
        <BackArrow />
      </div>
      <div className="mt-20 p-4">
        <h2 className="text-3xl">Welcome Back</h2>
        <p className="text-gray-700 text-xl mt-6">
          New user?
          <Link to="/signup">
            <span className="ml-3 text-blue-700 font-medium">Create account</span>
          </Link>
        </p>
        {error && (
          <div className="mt-6 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
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
          className="w-full h-14 border border-gray-400 rounded-lg px-4 mb-4 text-lg"
        />
        <input
          placeholder="Password"
          type="password"
          className="w-full h-14 border rounded-lg border-gray-400 px-4 mb-4 text-lg"
        />
        <span className="text-blue-600 font-medium">Forgot password?</span>
        <button className="w-full h-14 bg-blue-600 rounded-lg text-white text-lg mt-6">
          Continue
        </button>
        <ChatHelp />
      </div>
    </div>
  );
}