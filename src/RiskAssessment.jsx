import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
// 5 Questions 
 const questions = [
  {
    id:1,
    text: "1. In general, how would your best friend describe you as a risk taker?",
    options: [
      "A real gambler",
      // "Willing to take risks after completing adequate research",
      "Cautious",
      "A real risk avoider",
      "A real investor"
    ],
  },
  {
    id: 2,
    text: "2. You are on a TV game show and can choose one of the following. Which would you take?",
    options: ["$1,000 in cash", "A 50% chance at $5,000", "A 25% chance at $10,000", "A 5% chance at $100,000"],
  },
  {
    id: 3,
    text: "3. You saved for a once-in-a-lifetime vacation. Three weeks before leaving, you lose your job. You would:",
    options: ["Cancel the vacation", "Take a cheaper vacation", "Go as planned", "Extend the vacation — you need it"],
  },
  {
    id: 4,
    text: "4. If you unexpectedly received $20,000 to invest, what would you do?",
    options: ["Deposit it in a bank account", "Buy safe bonds or T-Bills", "Invest in stocks", "Put it all in high-risk investments"],
  },
  {
    id: 5,
    text: "5. How comfortable are you investing in stocks or stock mutual funds?",
    options: ["Not comfortable at all", "Somewhat comfortable", "Comfortable", "Very comfortable"],
  },
 
 ];

export default function RiskAssessment({ answers, setAnswers }) {
  const navigate = useNavigate();
  const handleSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex + 1 }); // numeric
  };
  return (
    <>
      <Navbar />
      <motion.div className="max-w-xl mx-auto px-4 py-6 space-y-8">
        <motion.h1 className="text-2xl font-semibold text-black text-left ml-6 mt-30">
           Risk Assessment Test
        </motion.h1>
        {questions.map((q, index) => (
          <motion.div key={q.id} className="bg-white-900 rounded-2xl p-5 -lg  -white-800">
            <p className="text-2xl font-medium text-white-100 mb-4">{q.text}</p>
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const selected = (answers ?.[q.id] || 0) === idx + 1;
                return (
                  <motion.label
                    key={opt}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`text-lg flex items-center gap-3 p-3 cursor-pointer transition-all ${
                      selected ? "bg-blu-600/20  -blue-500" : "hover:bg-white-800"
                    }`}
                  >
                    <motion.input
                      type="radio"
                      name={`question-${q.id}`}
                      checked={selected}
                      onChange={() => handleSelect(q.id, idx)}
                      className="h-5 w-5 text-blue-500 accent-blue-500"
                    />
                    <span className="text-white-200">{opt}</span>
                  </motion.label>
                );
              })}
            </div>
          </motion.div>
        ))}
        <motion.button
          onClick={() => navigate("/results")}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-[#2f5d50] hover:bg-blue-700 text-white py-3 text-lg rounded-xl font-medium mt-6 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </>
  );
}
