import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChatHelp from "./chatHelp";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import BackArrow from "./Backarrow";


// Disposable email domains
const disposableDomains = [
  "tempmail.com",
  "mailinator.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
];
// Allowed TLDs
const allowedTLDs = ["com", "org", "net", "co", "io", "edu"];
// Strict email validation
const emailValidation = yup
  .string()
  .required("Email is required")
  .email("Invalid email format")
  .test("tld-check", "Email domain is invalid", (value) => {
    if (!value) return false;
    const domain = value.split("@")[1];
    if (!domain) return false;
    const tld = domain.split(".").pop();
    return allowedTLDs.includes(tld);
  })
  .test("disposable-check", "Disposable emails are not allowed", (value) => {
    if (!value) return false;
    const domain = value.split("@")[1];
    return !disposableDomains.includes(domain);
  });
// Yup schema
const signupSchema = yup.object().shape({
  email: emailValidation,
});
export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errormsg, setErrormsg] = useState(false);
  // Step 1: Email
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });
  // Step 2: OTP
  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    formState: { errors: otpErrors },
    reset: resetOTP,
  } = useForm();
  // Step 3: Name / Phone / Password / Terms
  const infoSchema = yup.object().shape({
    fullName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phone: yup.string().required("Phone number is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    terms: yup.bool().oneOf([true], "You must accept terms"),
  });
  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors, isValid: isInfoValid },
    watch,
  } = useForm({
    resolver: yupResolver(infoSchema),
    mode: "onChange",
  });

  // Step 1 submit (email)
  const onEmailSubmit = (data) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    console.log("Generated OTP:", otp);
    setStep(2);
    setEmail(data.email);
  };
  // Step 2 submit (OTP)
  const onOTPSubmitHandler = (data) => {
    if (data.otp === generatedOTP) {
      setStep(3);
    } else {
      setErrormsg(true);
      alert("Invalid OTP");
      resetOTP();
    }
  };
  // Step 3 submit (info) + store in localStorage
  const onInfoSubmitHandler = (data) => {
    console.log("Signup complete:", data);
    // Store email + password in localStorage
    localStorage.setItem(
      "signupData",
      JSON.stringify({ email, password: data.password })
    );
    alert("Signup completed!");
    navigate("/socialinfo"); // redirect to dashboard
  };

  const goback = () => navigate("/");
  return (
    <div className="w-full bg-re-300 p-4 flex justify-center md:items-center relative">
      <div className="absolute left-5 top-10" onClick={goback}>
        <BackArrow />
      </div>
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 w-full bg-white mt-2 md:p-6 max-w-md mt-20">
              <h2 className="text-3xl leading-normal md:text-3xl">
                Become An Elite Investor
              </h2>
              <p className="text-gray-700 text-xl mt-6">
                Got an account?
                <Link to="/signin">
                  <span className="ml-3 text-[#0b3c39] font-medium text-xl">
                    Sign In
                  </span>
                </Link>
              </p>
              <form
                onSubmit={handleEmailSubmit(onEmailSubmit)}
                className="mt-10 space-y-5"
              >
                <button
                  type="button"
                  
                  disabled={loading}
                  className="relative flex justify-center items-center w-full h-15 border-1 border-gray-500 rounded-md cursor-pointer"
                >
                  <span>
                    <FcGoogle className="w-6 h-6 mr-6" />
                  </span>
                  <span className="font-medium text-xl text-gray-700">
                    {loading ? "Signing up..." : "Sign up with Google"}
                  </span>
                </button>
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
                <div className="flex items-center mb-4 mt-8">
                  <hr className="flex-1 border-gray-300" />
                  <span className="px-2 text-gray-400 text-sm">or</span>
                  <hr className="flex-1 border-gray-300" />
                </div>
                <div>
                  <input
                    {...registerEmail("email")}
                    type="text"
                    placeholder="Email Address"
                    className="text-xl pl-4 text-gray-800 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {emailErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {emailErrors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full h-15 bg-[#0b3c39] rounded-md mt-15 flex justify-center items-center hover:bg-blue-700 transition ${
                    !isEmailValid ? "bg-[#0b3c39] cursor-not-allowed" : ""
                  }`}
                  disabled={!isEmailValid}
                >
                  <span className="font-medium text-white text-xl">
                    Continue
                  </span>
                </button>
                <div className="mt-5">
                  <ChatHelp />
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Step 2: OTP */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 w-full bg-white mt-3 md:p-6 max-w-md mt-20">
              <span className="">{generatedOTP}</span>
              <h2 className="text-2xl font-medium leading-normal md:text-xl">
                Enter the 6 digit code we've sent to
              </h2>
              <p className="mb-7 text-gray-600 font-medium text-2xl mt-6">
                {email}
              </p>
              <span className="text-xl text-[#0b3c39] font-medium ">
                Wrong email?
              </span>
              <form
                onSubmit={handleOTPSubmit(onOTPSubmitHandler)}
                className="mt-10 space-y-5"
              >
                <div>
                  <input
                    {...registerOTP("otp", { required: true, maxLength: 6 })}
                    type="text"
                    placeholder="OTP"
                    className="mb-10 text-xl pl-4 text-gray-900 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {otpErrors.otp && (
                    <p className="text-red-500 text-sm mt-2">
                      {otpErrors.otp.message}
                    </p>
                  )}
                  <h2 className="mb-5 text-[#0b3c39] font-medium text-xl">
                    CHECK YOUR EMAIL
                  </h2>
                  <span className="text-gray-600 text-xl">
                    Didn't get OTP?{" "}
                    <span className="text-[#0b3c39] font-medium">Resend</span>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full h-15 bg-[#0b3c39] rounded-md mt-15 flex justify-center items-center hover:bg-blue-700 transition"
                >
                  <span className="font-medium text-white text-xl">
                    Verify OTP
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Step 3: Name / Phone / Password / Terms */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 w-full bg-white mt-3 md:p-6 max-w-md mt-20">
              <h2 className="text-4xl leading-normal md:text-3xl">
                Let Get To Know You More
              </h2>
              <form
                onSubmit={handleInfoSubmit(onInfoSubmitHandler)}
                className="mt-10 space-y-5"
              >
                <div>
                  <input
                    {...registerInfo("fullName")}
                    type="text"
                    placeholder="Legal First Name"
                    className="text-xl pl-4 text-gray-800 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {infoErrors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {infoErrors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerInfo("lastName")}
                    type="text"
                    placeholder="Legal Last Name"
                    className="text-xl pl-4 text-gray-800 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {infoErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {infoErrors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerInfo("phone")}
                    type="text"
                    placeholder="Phone Number"
                    className="text-xl pl-4 text-gray-800 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {infoErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {infoErrors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...registerInfo("password")}
                    type="password"
                    placeholder="Password"
                    className="text-xl pl-4 text-gray-800 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {infoErrors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {infoErrors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...registerInfo("terms")}
                    id="terms"
                    className="mr-5 w-10 h-10 accent-blue-500"
                  />
                  <label htmlFor="terms" className="text-gray-700 text-lg mt-4">
                    By checking this checkbox, you agree to our{" "}
                    <span className="text-[#0b3c39] font-medium">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-[#0b3c39]">
                      Privacy Policy
                    </span>
                  </label>
                </div>
                {infoErrors.terms && (
                  <p className="text-red-500 text-sm mt-1">
                    {infoErrors.terms.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full h-15 bg-[#0b3c39] rounded-md mt-10 flex justify-center items-center hover:bg-blue-700 transition"
                >
                  <span className="font-medium text-white text-xl">
                    Complete Signup
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Step Indicator */}
      <div className="absolute bottom-2 w-full flex justify-center space-x-4">
        <span
          className={`w-3 h-3 rounded-full ${
            step === 1 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`w-3 h-3 rounded-full ${
            step === 2 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></span>
        <span
          className={`w-3 h-3 rounded-full ${
            step === 3 ? "bg-blue-600" : "bg-gray-300"
          }`}
        ></span>
      </div>
    </div>
  );
}