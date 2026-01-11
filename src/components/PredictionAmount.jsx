import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function PredictionAmount() {
  const navigate = useNavigate();
  // Slider principal
  const [amount, setAmount] = useState(100000);
  // Duration type: month/year
  const [durationType, setDurationType] = useState("month");
  // Duration number: selected month/year
  const [durationNumber, setDurationNumber] = useState(3);
  // Month dropdown number (sync with year if selected)
  const [monthNumber, setMonthNumber] = useState(durationNumber);
  // Annual interest rate
  const interestRate = 0.06;
  // Sync months when duration type or number changes
  useEffect(() => {
    if (durationType === "year") {
      setMonthNumber(durationNumber * 12); // total months for selected years
    } else {
      setMonthNumber(durationNumber); // use selected month
    }
  }, [durationType, durationNumber]);
  // Compound interest calculation
  const getTotalAmount = () => {
    const t = monthNumber / 12; // convert months to years
    return amount * Math.pow(1 + interestRate, t);
  };
  const total = getTotalAmount();
  const interestEarned = total - amount;
  // Default month options
  const monthOptions = [1, 3, 6,9];
  // Generate months dynamically if year selected
  const dynamicMonths =
    durationType === "year"
      ? Array.from({ length: monthNumber }, (_, i) => i + 1)
      : monthOptions;
  return (
    <div>
      <div
        onClick={() => navigate("/signup")}
        className="absolute right-6 top-5"
      >
        <XMarkIcon className="w-6 h-6 text-gray-800" />
      </div>
      <div className="mt-24 flex gap-4 flex-col justify-center items-center">
        <p className="text-gray-500 text-xl">If you Invested</p>
        <h2 className="font-small text-gray-800 text-4xl">
          GHS {amount.toLocaleString()}
        </h2>
        <div className="flex gap-14 p-6 mt-5 items-center justify-center">
          <div>
            <select
              className="text-xl text-gray-600 border-none outline-none"
              value={durationType}
              onChange={(e) => setDurationType(e.target.value)}
            >
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          <div>
            <select
              className="text-xl text-gray-600 border-none outline-none"
              value={durationNumber}
              onChange={(e) => setDurationNumber(Number(e.target.value))}
            >
              {durationType === "month"
                ? monthOptions.map((m) => (
                    <option key={m} value={m}>
                      {m} {m === 1 ? "Month" : "Months"}
                    </option>
                  ))
                : [1, 2, 3, 5, 10].map((y) => (
                    <option key={y} value={y}>
                      {y} {y === 1 ? "Year" : "Years"}
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="pl-8 pr-8 w-full flex flex-col justify-center items-center">
          <div className="w-full max-w-md mx-auto mt-10">
            <input
              type="range"
              min="0"
              step="10"
              max="100000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="
                w-full h-1 rounded-full appearance-none cursor-pointer
                bg-green-400
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-10
                [&::-webkit-slider-thumb]:h-10
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-gray-200
                [&::-webkit-slider-thumb]:shadow-xl
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-8
                [&::-moz-range-thumb]:h-8
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:shadow-xl
                [&::-moz-range-thumb]:cursor-pointer
              "
            />
          </div>
          <p className="mt-7 text-gray-700">Today, you'd have</p>
          <h2 className="mt-5 font-small text-3xl text-gray-500">
            GHS {Number(total.toFixed(2)).toLocaleString()}
          </h2>
          <div className="w-full py-2 bg-[#e6f2ef] mt-15 flex justify-center items-center px-3 rouned-2xl">
            <span className="text-center text-green-800 font-small text-lg">
              <span className="font-medium text-xl">GHS {Number(interestEarned.toFixed(2)).toLocaleString()}</span> earned as ROI%
              on Feenicks1
            </span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate("/signup")}
              className="py-4 px-20 mt-10 text-lg rounded-lg bg-green-800 text-white font-medium"
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PredictionAmount;