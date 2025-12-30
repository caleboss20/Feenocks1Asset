import { Link, useNavigate } from "react-router-dom";
import BackArrow from "../components/Backarrow";
import { useState, useRef } from "react";
import { FiChevronRight, FiCheck } from "react-icons/fi";
import { motion, useAnimation } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";
function DepositAmount({ selectedMethod, walletName,inputAmount,setInputAmount }) {
  const amountOptions = [
    { id: "100", amount: "GH₵ 100" },
    { id: "500", amount: "GH₵ 500" },
    { id: "1000", amount: "GH₵ 1,000" },
    { id: "3000", amount: "GH₵ 3,000" },
    { id: "5000", amount: "GH₵ 5,000" },
    { id: "10000", amount: "GH₵ 10,000" },
    { id: "100000", amount: "GH₵ 100,000" },
  ];
  const min = 100;
  const max = 100000;
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [popup, setPopup] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movedToCenter, setMovedToCenter] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();
  const constraintsRef = useRef(null);
  const BUTTON_WIDTH = 320;
  const BUTTON_HEIGHT = 56;
  const THUMB_SIZE = 48;
  const PADDING = 4;
  const MAX_X = BUTTON_WIDTH - THUMB_SIZE - PADDING * 2;
  const formatNumber = (num) => {
    if (!num && num !== 0) return "";
    return Number(num).toLocaleString();
  };
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!value) {
      setInputAmount("");
      setSelectedId(null);
      setError("");
      return;
    }
    const numericValue = Number(value);
    if (isNaN(numericValue)) return;
    if (numericValue < min) setError(`Amount must be at least GH₵ ${min}`);
    else if (numericValue > max)
      setError(`Amount cannot exceed GH₵ ${(max).toFixed(2)}`);
    else setError("");
    setInputAmount(numericValue);
    setSelectedId(null);
  };
  const handleSelectPreset = (item) => {
    setSelectedId(item.id);
    setInputAmount(item.id);
    setError("");
  };
  const handleContinue = () => {
    if (!inputAmount || error) {
      setError("Please select or enter a valid amount");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setPopup(true);
  };
  const confirmDeposit = () => {
    if (!confirmed) {
      setConfirmed(true);
      setMovedToCenter(true);
      controls.start({ x: BUTTON_WIDTH / 2 - THUMB_SIZE / 2 - PADDING });
      setTimeout(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setTimeout(() => {
            navigate("/depositconfirm"); 
          }, 2000);
        }, 4000); // 4s loader
      }, 300);
    }
  };
  const handleDragEnd = (_, info) => {
    if (info.point.x > MAX_X * 0.75) {
      confirmDeposit();
    } else {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 400, damping: 25 } });
    }
  };
  return (
    <div className="p-4 mt-4">
      {/* Header */}
      <div className="flex gap-15">
        <Link to="/depositmethod">
          <div>
            <BackArrow />
          </div>
        </Link>
        <div>
          <p className="font-medium text-lg">{selectedMethod}</p>
        </div>
      </div>
      {/* Amount input */}
      <div>
        <h2 className="mt-15 pl-2 text-2xl text-black font-medium">Amount:</h2>
        <motion.input
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
          type="text"
          value={formatNumber(inputAmount)}
          onChange={handleInputChange}
          className={`mt-7 ${shake ? "border-red-700" : ""} w-full py-4 border-b border-gray-700 text-2xl pt-4 pl-4 outline-none`}
        />
        {error && (
          <div className="flex gap-2 items-center">
            <MdErrorOutline className="w-5 h-5 text-red-600 mt-2" />
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        )}
        {/* Preset amounts */}
        <h2 className="mt-15 pl-2 text-2xl text-black font-medium">I will choose from here</h2>
        <div className="flex mt-10 gap-4 flex-wrap">
          {amountOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectPreset(item)}
              className={`py-4 px-8 text-black font-medium rounded-3xl ${
                selectedId === item.id ? "border-1 border-blue-600 bg-blue-200" : "bg-gray-100"
              }`}
            >
              {item.amount}
            </div>
          ))}
        </div>
        {/* Confirm button */}
        <div>
          <button
            onClick={handleContinue}
            className={`w-full py-4 rounded-lg mt-27 font-medium text-lg ${
              inputAmount && !error ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-50"
            }`}
          >
            Confirm Deposit
          </button>
          {/* Popup */}
          {popup && (
            <>
              <div
                onClick={() => setPopup(false)}
                className="fixed top-0 bottom-0 right-0 inset-0 bg-black/50 w-full z-20"
              ></div>
              <div className="z-50 fixed bottom-0 left-0 right-0 h-[500px] bg-white">
                <div className="flex gap-15 p-4 items-center mt-3">
                  <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <span
                      onClick={() => setPopup(false)}
                      className="text-3xl text-black"
                    >
                      &times;
                    </span>
                  </div>
                  <h2 className="font-medium text-lg ml-3">Confirm Deposit</h2>
                </div>
                <div className="w-full h-[1px] bg-gray-300 mt-1"></div>
                <h2 className="text-center mt-5 font-medium text-2xl">
                  GH₵ {inputAmount}.00
                </h2>
                <div className="flex flex-col gap-4 p-4 pr-6">
                  <div className="flex justify-between mt-3">
                    <span>From:</span>
                    <span className="font-medium">{selectedMethod}</span>
                  </div>
                  <div className="w-full h-[1px] bg-gray-300 mt-1"></div>
                  <div className="flex justify-between mt-3">
                    <span>To:</span>
                    <span className="font-medium">{walletName}</span>
                  </div>
                </div>
                {/* Swipe button */}
                <div
                  ref={constraintsRef}
                  className="ml-4 mt-10 mr-6 flex items-center justify-center bg-gray-100 rounded-full relative h-14"
                  style={{ padding: PADDING }}
                >
                  {/* Text only when circle not moved */}
                  {!movedToCenter && (
                    <span className="absolute text-gray-600 font-medium">
                      Swipe to confirm deposit
                    </span>
                  )}
                  <motion.div
                    drag={loading || confirmed ? false : "x"}
                    dragConstraints={constraintsRef}
                    dragElastic={0.2}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    initial={{ x: 0 }}
                    whileHover={!confirmed && !loading ? { scale: 1.05 } : {}}
                    onClick={() => confirmDeposit()}
                    tabIndex={0}
                    className="absolute w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-blue-600 cursor-pointer text-white"
                    style={{
                      left: movedToCenter ? "50%" : `${PADDING}px`,
                      transform: movedToCenter ? "translateX(-50%)" : "none",
                      transition: "left 0.3s ease",
                    }}
                  >
                    {/* Loader */}
                    {movedToCenter && loading && (
                      <svg className="absolute w-14 h-14 -z-10" viewBox="0 0 36 36">
                        <circle
                          className="text-gray-200"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="16"
                          cx="18"
                          cy="18"
                        />
                        <motion.circle
                          className="text-blue-600"
                          strokeWidth="4"
                          stroke="currentColor"
                          fill="transparent"
                          r="16"
                          cx="18"
                          cy="18"
                          strokeDasharray="100"
                          strokeDashoffset="100"
                          animate={{ strokeDashoffset: 0 }}
                          transition={{ duration: 4, ease: "linear" }}
                        />
                      </svg>
                    )}
                    {/* Icon */}
                    {!loading && !confirmed && <FiChevronRight size={20} />}
                    {!loading && confirmed && <FiCheck size={20} className="text-white" />}
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default DepositAmount;