import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
// 13 Questions 
 const questions = [
  {
    id:1,
    text: "1. In general, how would your best friend describe you as a risk taker?",
    options: [
      "A real gambler",
      "Willing to take risks after completing adequate research",
      "Cautious",
      "A real risk avoider",
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
  {
    id: 6,
    text: "6. When you hear the word ‘risk’, what comes to mind first?",
    options: ["Danger", "Uncertainty", "Opportunity", "Thrill"],
  },
  {
    id: 7,
    text: "7. Experts predict prices of hard assets will rise while bond prices may fall. Most of your assets are in government bonds. What would you do?",
    options: ["Hold all bonds", "Sell some bonds", "Sell most bonds", "Sell all bonds and buy hard assets"],
  },
  {
    id: 8,
    text: "8. Given best- and worst-case returns, which investment do you prefer?",
    options: ["Gain $200 or lose $0", "Gain $800 or lose $200", "Gain $2,600 or lose $800", "Gain $4,800 or lose $2,400"],
  },
  {
    id: 9,
    text: "9. You have been given $1,000. Choose one:",
    options: ["Take a sure gain of $500", "A 50% chance to gain $1,000", "A 25% chance to gain $2,000", "A 5% chance to gain $10,000"],
  },
  {
    id: 10,
    text: "10. You have been given $2,000. Choose one:",
    options: ["A sure loss of $500", "A 50% chance to lose $1,000", "A 25% chance to lose $2,000", "A 5% chance to lose $10,000"],
  },
  {
    id: 11,
    text: "11. A relative leaves you $100,000 that must be invested in ONE option. Choose:",
    options: ["A savings account or T-Bills", "A bond mutual fund", "A stock mutual fund", "A mix of small-cap and international stocks"],
  },
  {
    id: 12,
    text: "12. If you had to invest $20,000, which investment is most appealing?",
    options: ["No-risk returns", "Low-risk, low-return", "Moderate-risk, moderate-return", "High-risk, high-return"],
  },
  {
    id: 13,
    text: "13. Your trusted friend is raising funds for a gold mining venture with 20% chance of success. How much would you invest?",
    options: ["Nothing", "A small amount", "A reasonable amount", "A large amount — big risk, big reward"],
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
          Investment Risk Assessment
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
          className="w-full px-4 bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-xl font-medium mt-6 transition"
        >
          Continue
        </motion.button>
      </motion.div>
    </>
  );
}
