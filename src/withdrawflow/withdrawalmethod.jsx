import BackArrow from "../components/Backarrow";
import { FaMobileAlt, FaUniversity, FaCreditCard } from "react-icons/fa";
import { FiChevronRight, FiCheck } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";


function WithDrawalMethod({selectedMethod,setSelectedMethod}) {
  // Array of payment methods (backend-ready)
  const paymentMethods = [
    {
      id: "Mobile Money",
      name: "Mobile Money",
      description: "Instant,no extra charges",
      icon: <FaMobileAlt />,
    },
    {
      id: "Bank Transfer",
      name: "Bank Transfer",
      description: "1– 2 business days",
      icon: <FaUniversity />,
    },
    {
      id: "Debit card Payment",
      name: "Debit Card",
      description: "Visa & Mastercard",
      icon: <FaCreditCard />,
    },
  ];
   const [error, setError] = useState(false);
  const navigate = useNavigate();
  const goNext = () => {
    selectedMethod ?navigate("/withdrawpage"):setError(true);
    
  };

  return (
    <>
    <div className="p-4 mt-4">
      <div className="flex gap-8">
        <Link to="/dashboard">
          <div>
            <BackArrow />
          </div>
        </Link>

        <div className="">
          <p className="font-medium text-lg">Choose your preferred method</p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl text-black font-medium">Select Method</h2>
      <div className="mt-10 flex flex-col gap-4">
        <div className="space-y-5">
          {paymentMethods.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full flex items-center justify-between px-4 py-6 rounded-xl border transition
              ${
                isSelected
                  ? "border-blue-600 border-2 bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
              >
                {/* Left side: icon and text */}
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  >
                    {method.icon}
                  </div>
                  <div className="text-left flex flex-col gap-2">
                    <p className="text-lg font-medium">{method.name}</p>
                    <p className="text-md text-gray-500">
                      {method.description}
                    </p>
                  </div>
                </div>
                {/* Right side: chevron or check */}
                {isSelected ? (
                  <FiCheck className="text-blue-600" />
                ) : (
                  <FiChevronRight className="text-gray-600" />
                )}
              </button>
            );
          })}
          {/* Optional: display selected for debug */}
          {/* <p className="mt-2 text-sm text-gray-500">
        Selected Method: {""} {selectedMethod || "None"}
      </p> */}
        </div>

        <div className="mt-12">
             {error && !selectedMethod && (
        <motion.div className="flex mt-10 gap-3 justify-center items-center">
          <MdErrorOutline className="w-6 h-6 text-red-600" />
          <span className="text-red-600 text-sm">
            Please select a payment method before continuing.
          </span>
        </motion.div>
      )}

        <button
        onClick={goNext}
          className={`${selectedMethod ? "bg-blue-600" : " bg-gray-200 "}
    w-full py-3 rounded-lg mt-7 text-white font-medium text-lg`}
        >
          Next
        </button>
        </div>

       
      </div>
    </div>
    
    </>
  );
}
export default WithDrawalMethod;
