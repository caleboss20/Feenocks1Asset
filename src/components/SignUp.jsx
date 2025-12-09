import { useState } from "react";
import { Link } from "react-router-dom";
import ChatHelp from "./chatHelp";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
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
  const [step, setStep] = useState(1);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [email, setEmail] = useState("");



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



  // Step 3: Name / Phone / Gender / Terms



  const {
    register: registerInfo,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors },
  } = useForm();






  // Step 1 submit
  const onEmailSubmit = (data) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(otp);
    console.log("Generated OTP:", otp);
    setStep(2);
    setEmail(data.email);
  };





  // Step 2 submit
  const onOTPSubmitHandler = (data) => {
    if (data.otp === generatedOTP) {
      setStep(3);
    } else {
      alert("Invalid OTP");
      resetOTP();
    }
  };






  // Step 3 submit
  const onInfoSubmitHandler = (data) => {
    console.log("Signup complete:", data);
    alert("Signup completed!");
  };



  return (
    <div className="w-full min-h-screen bg-re-300 p-4 flex justify-center md:items-center relative">
      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 w-full bg-white mt-32 md:p-6 w-full max-w-md bg-white mt-20">
              <h2 className="text-5xl leading-normal md:text-3xl">
                Become An Elite Investor
              </h2>
              <p className="text-gray-700 text-xl mt-6">
                Got an account?
                <Link to="/signin">
                  <span className="ml-3 text-blue-700 font-medium text-xl">
                    Sign In
                  </span>
                </Link>
              </p>
              <form
                onSubmit={handleEmailSubmit(onEmailSubmit)}
                className="mt-10 space-y-5"
              >
                <div className="relative flex justify-center items-center w-full h-15 border-1 border-gray-500 rounded-md cursor-pointer">
                  <span>
                    <FcGoogle className="w-6 h-6 mr-6" />
                  </span>
                  <span className="font-medium text-xl text-gray-700">
                    Sign up with Google
                  </span>
                </div>
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
                  className={`w-full h-15 bg-blue-600 rounded-md mt-15 flex justify-center items-center hover:bg-blue-700 transition ${
                    !isEmailValid ? "bg-blue-200 cursor-not-allowed" : ""
                  }`}
                  disabled={!isEmailValid}
                >
                  <span className="font-medium text-white text-xl">
                    Continue
                  </span>
                </button>
                <ChatHelp />
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
            <div className="p-2 w-full bg-white mt-32 md:p-6 w-full max-w-md bg-white mt-20">
              <span className="">{generatedOTP}</span>
              <h2 className="text-2xl font-medium leading-normal md:text-xl">
                Enter the 6 digit code we've sent to
              </h2>
              <p className="mb-7 text-gray-600 font-medium text-2xl mt-6">
                {email}
              </p>
              <span className="text-xl text-blue-600 font-medium ">
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
                    <p className="text-red-500 text-sm mt-1">
                      {otpErrors.otp.message}
                    </p>
                  )}

                  <h2 className="mb-5 text-blue-600 font-medium text-xl">
                    CHECK YOUR EMAIL
                  </h2>
                  <span className="text-gray-600 text-xl">
                    Didn't get OTP?{" "}
                    <span className="text-blue-600 font-medium">Resend</span>
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full h-15 bg-blue-600 rounded-md mt-15 flex justify-center items-center hover:bg-blue-700 transition"
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
      {/* Step 3: Name / Phone / Gender / Terms */}
      <AnimatePresence>
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ x: 500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -500, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 w-full bg-white mt-32 md:p-6 w-full max-w-md bg-white mt-20">
              <h2 className="text-5xl leading-normal md:text-3xl">
                Let Get To Know You More
              </h2>
              <form
                onSubmit={handleInfoSubmit(onInfoSubmitHandler)}
                className="mt-10 space-y-5"
              >
                <div>
                  <input
                    {...registerInfo("fullName", { required: true })}
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
                    {...registerInfo("LastName", { required: true })}
                    type="text"
                    placeholder="Legal Last Name"
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
                    {...registerInfo("phone", { required: true })}
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
                    {...registerInfo("password", { required: true })}
                    type="text"
                    placeholder="Password"
                    className="text-xl pl-4 text-gray-800 w-full h-15 border-1 border-gray-500 rounded-md"
                  />
                  {infoErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {infoErrors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...registerInfo("terms", { required: true })}
                    id="terms"
                    className="mr-5 w-10 h-10 accent-blue-500"
                  />
                  <label htmlFor="terms" className="text-gray-700 text-lg mt-4">
                    By checking this checkbox, you agree to our{" "}
                    <span className="text-blue-600 font-medium">
                      Terms and Conditions
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-blue-600">
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
                  className="w-full h-15 bg-blue-600 rounded-md mt-10 flex justify-center items-center hover:bg-blue-700 transition"
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
      <div className="absolute bottom-6 w-full flex justify-center space-x-4">
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
