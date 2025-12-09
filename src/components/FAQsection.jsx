import { useState } from "react";
function FAQsection(){
const [openIndex, setOpenIndex] = useState(null);
const faqs = [
  {
    question: "What is Feenicks1?",
    answer:
      "Feenicks1 is a platform that allows you to invest and trade in various financial products securely.",
  },
  {
    question: "Who can trade on Feenicks1?",
    answer:
      "Anyone who registers and meets the platform’s requirements can trade on Feenicks1 .",
  },
  {
    question: "Is my personal and financial information secure on Feenicks1?",
    answer:
      "Yes. Feenicks1 uses industry-standard security measures to protect your personal and financial information.",
  },
];
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

   return (
    <div className="max-w-xl mx-auto p-6">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-gray-400 py-4">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left font-medium text-gray-800"
          >
            <span className="text-lg">{faq.question}</span>
            <span className="text-3xl">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="mt-2 text-lg text-gray-600">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );

}
export default FAQsection;