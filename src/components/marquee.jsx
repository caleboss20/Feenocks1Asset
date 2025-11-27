import { motion } from "framer-motion";
const CardMarquee = () => {
  const cards = [
    "What Is Bitcoin ?",
    "Invest my Forex Capital",
    "Your Investment Partners",
    "Your Money works for you",
    "Invest smarter"
  ];
  return (
    <motion.div
         initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
          whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
          viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
          transition={{ duration: 0.9, ease: "easeOut" }} //
     className="mt-30 w-full overflow-hidden relative bg-white-100 py-10">
      <div className="flex gap-10 animate-marquee">
        {[...cards,...cards,...cards].map((text, idx) => (
          <div
            key={idx}
            className="border border-gray-200 p-4 rounded-3xl h-60 w-80 bg-white-300 flex-shrink-0"
          >
            <h2 className="text-7xl text-blue-600">"</h2>
            <h2 className="text-4xl leading-tight font-bold text-blue-600">
              {text}
            </h2>
          </div>
        ))}
      </div>
      {/* Inline CSS animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
          display:inline-flex;
            animation: marquee 50s linear infinite;
          }
        `}
      </style>
    </motion.div>
  );
};
export default CardMarquee;