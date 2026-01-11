import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
function PasswordReset() {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(emailRegex.test(value));
    setShowSuccess(false); // hide success if user edits email
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true); // start spinner
    setShowSuccess(false);
    // simulate async email sending
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
    }, 3000);
  };
  return (
    <div className="p-5">
      <div className="">
        <h2 className="font-bold text-2xl text-gray-900">FEENICKS1</h2>
      </div>
      <div className="mt-20">
        <h2 className="font-bold text-3xl text-green-900">Reset Password</h2>
        <form className="mt-15" onSubmit={handleSubmit}>
          <input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={handleChange}
            className={`outline-none bg-transparent w-full h-14 border rounded-lg px-4 mb-2 text-lg
              ${email.length === 0 ? "border-gray-400" : isValid ? "border-green-600" : "border-red-500"}
            `}
          />
          {/* Live validation message */}
          {!loading && email.length > 0 && !isValid && (
            <p className="text-red-500 text-sm mb-4">Please enter a valid email</p>
          )}
          {showSuccess && (
            <div className="mt-4 flex items-center gap-2 text-green-600 text-md mb-4">
              <CheckCircleIcon className="w-5 h-5 mt-1 text-green-400" />
              <span>Password reset email sent successfully</span>
            </div>
          )}
          <button
            type="submit"
            disabled={!isValid || loading}
            className={`mt-20 w-full h-14 rounded-lg text-white font-medium text-lg relative flex items-center justify-center
              ${isValid ? "bg-[#2f5d50]" : "bg-gray-200 cursor-not-allowed"}
              ${loading ? "bg-gray-200" : ""}
            `}
          >
            {loading && (
              <span className="z-40 absolute left-4 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            Send Reset Password
          </button>
          <div className="items-center flex mt-10 text-gray-500 text-md gap-3">
            <span className="font-small">still got trouble?</span>
           <Link to="/support">
           <span className="text-green-600 font-medium"> support</span>
           </Link>
            
            <Link to="/policydraft">
             <span>Privacy</span>
            </Link>
           
            <div className="w-[1.3px] h-3 bg-gray-300 mt-1"></div>
            <Link to="/termsdraft">
             <span>Terms</span>
            </Link>
           
          </div>
        </form>
      </div>
    </div>
  );
}
export default PasswordReset;