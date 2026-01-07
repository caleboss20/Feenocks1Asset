import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HiChevronRight } from "react-icons/hi";
import { MdOutlineSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
function SupportCenter() {
  const navigate = useNavigate();
  // Default FAQs
  const faqs = [
    {
      id: 1,
      question: "How much interest will my investment earn?",
      answer:
        "Your investment return depends on your chosen plan. Returns vary monthly.",
    },
    {
      id: 2,
      question: "How do I reset my password if I forgot it?",
      answer:
        "Click 'Forgot password' on the login screen and follow the instructions.",
    },
    {
      id: 3,
      question: "Why hasn't my deposit reflected?",
      answer:
        "Deposits may take 24-48 hours. Contact support if it takes longer.",
    },
    {
      id: 4,
      question: "What is Feenicks1 ID Number?",
      answer:
        "Your ID is your unique identifier for all account-related support.",
    },
  ];
  // Keyword-based dynamic answers
  const keywordAnswers = {
    bitcoin:
      "Bitcoin is a digital currency. Investing in it carries high risk and is volatile. Always research carefully.",
    ethereum:
      "Ethereum is a blockchain platform with smart contracts. Like any crypto, it has risks.",
    deposit:
      "Deposits may take 24-48 hours to reflect depending on your bank.",
  };
  const [openFaqs, setOpenFaqs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const toggleFaq = (id) => {
    setOpenFaqs((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dynamicAnswer =
    searchTerm && keywordAnswers[searchTerm.toLowerCase()];
  const hasResults = filteredFaqs.length > 0 || dynamicAnswer;
  
  const handleSend=()=>{
    const message="Hello,I need support"
    const phoneNumber="233256599734";
    const url=`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }
  
  
  
  
  
  return (
    <div className="w-full">
      <div className="z-1 flex gap-2 justify-between w-full h-60 bg-[#2f5d50] p-4">
        <div>
          <h2 className="mt-5 leading-normal text-2xl text-white font-medium">
            Hi there 👋
            <p>How can we help?</p>
          </h2>
        </div>
        <div
          onClick={() => navigate("/")}
          className=" w-6 h-6 rounded-lg bg-blu-900 py-5 px-5 flex items-center justify-center"
        >
          <span className="text-3xl text-white">&times;</span>
        </div>
      </div>
      <div className="p-4 relative w-full bg-gra-400">
        <div className="p-4 -mt-22 z-50 w-full bg-white rounded-lg shadow-xl">
          <h2 className="font-medium text-lg text-gray-800">Got questions?</h2>
          <div className="gap-4 pr-1 py-1 w-full h-12 border-1 mt-5 flex rounded-lg border-gray-600">
            <input
              type="text"
              placeholder="What is Bitcoin?"
              className="text-gray-800 pl-4 flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex justify-center items-center w-10 bg-[#2f5d57bb] rounded-lg">
              <MagnifyingGlassIcon className="text-white w-6 h-6" />
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className=" rounded overflow-hidden bg-gray-100">
                <button
                  className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <p className="font-small text-left">{faq.question}</p>
                  <HiChevronRight
                    className={`font-bold w-7 h-7 transform transition-transform ${
                      openFaqs[faq.id] ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaqs[faq.id] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-gray-50 text-gray-700"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            {dynamicAnswer && (
              <div className="border rounded overflow-hidden p-4 bg-gray-50 text-gray-700">
                {dynamicAnswer}
              </div>
            )}
            {!hasResults && (
              <div className="border rounded overflow-hidden p-4 bg-gray-50 text-gray-700">
                No matching results found.
              </div>
            )}
          </div>
        </div>
        <div className="pr-4 pl-4 justify-between flex items-center w-full h-20 mt-5 rounded-lg bg-white shadow-lg">
          <p className="font-medium">Send us a message</p>
          <div onClick={handleSend}>
            <MdOutlineSend className="" />
            </div>
        </div>
      </div>
    </div>
  );
}
export default SupportCenter;