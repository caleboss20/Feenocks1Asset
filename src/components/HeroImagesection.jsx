import { useState, useEffect } from "react";
import { motion,AnimatePresence } from "framer-motion";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { GiPlantSeed } from "react-icons/gi";
import { FaChartBar } from "react-icons/fa";
// Import your images
import hero from "../assets/images/hero1.png";
import hero5 from "../assets/images/hero6.jpg";
import lady1 from "../assets/images/lady1.jpg";
import lady2 from "../assets/images/lady2.jpg";
import lady3 from "../assets/images/lady3.jpg";
import lady4 from "../assets/images/lady4.jpg";
import lady5 from "../assets/images/lady5.jpg";
import lady6 from "../assets/images/lady6.jpg";
import lady7 from "../assets/images/lady7.jpg";

const HeroImageSection = () => {
  const images = [lady1, lady2, lady3, lady4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Example count values for cards
  const count = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // every 3 seconds
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div
      className="overflow-visible w-full rounded-2xl h-120 mt-20 border-10 border-white relative"
      animate={{ y: [30, -15, 30] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        type: "tween",
      }}
    >
      {/* Hero Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImageIndex} // important for AnimatePresence
          // src={images[currentImageIndex]}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // fade duration 1s
        />
      </AnimatePresence>
      <img
        // src={images[currentImageIndex]}
        src={lady4}
        alt=""
        className="w-full h-full object-cover"
      />
      {/* Bitsusu Card */}
      <div className="py-1 px-2 items-center flex justify-between absolute w-32 rounded-lg bg-white -left-6 bottom-3 shadow-2xl z-20">
        <div className="flex flex-col">
          <span className="font-medium text-[12px] text-blue-500">Bitsusu</span>
          <span className="text-[12px] text-gray-900 font-bold">
            ₵{count.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-800">6% interest rate</span>
        </div>
        <div className="py-1 px-1 bg-blue-100 rounded-full">
          <CurrencyDollarIcon className="w-4 h-4 text-blue-700" />
        </div>
      </div>
      {/* Real Estate Card */}
      <div className="py-1 px-2 items-center justify-between flex absolute w-32 rounded-lg bg-white -left-7 bottom-95 shadow-2xl z-20">
        <div className="flex flex-col">
          <span className="font-medium text-[12px] text-pink-500">Real Estate</span>
          <span className="text-[12px] text-gray-900 font-bold">
            ₵{count.toLocaleString()}
          </span>
          <span className="text-[10px] text-gray-800">9% interest rate</span>
        </div>
        <div className="py-1 px-1 bg-pink-100 rounded-full">
          <BuildingLibraryIcon className="w-4 h-4 text-pink-700" />
        </div>
      </div>
      {/* Agribusiness Card */}
      <div className="py-1 px-2 items-center justify-between flex absolute w-32 rounded-lg bg-white -left-7 bottom-56 shadow-2xl z-20">
        <div className="flex flex-col">
          <span className="font-medium text-[12px] text-green-500">Agribusiness</span>
          <span className="text-[12px] text-gray-900 font-bold">₵22,000</span>
          <span className="text-[10px] text-gray-800">6% interest rate</span>
        </div>
        <div className="py-1 px-1 bg-green-100 rounded-full">
          <GiPlantSeed className="w-4 h-4 text-green-700" />
        </div>
      </div>
      {/* Mutual Fund Card */}
      <div className="py-1 px-2 items-center justify-between flex absolute w-32 rounded-lg bg-white -right-7 bottom-94 shadow-2xl z-20">
        <div className="flex flex-col">
          <span className="font-medium text-[12px] text-orange-500">Mutual Fund</span>
          <span className="text-[12px] text-gray-900 font-bold">₵48,000</span>
          <span className="text-[10px] text-gray-800">5% interest rate</span>
        </div>
        <div className="py-1 px-1 bg-orange-100 rounded-full">
          <FaChartBar className="w-4 h-4 text-orange-700" />
        </div>
      </div>
      {/* ForexTrading Card */}
      <div className="py-1 px-2 items-center justify-between flex absolute w-32 rounded-lg bg-white -right-7 bottom-51 shadow-2xl z-20">
        <div className="flex flex-col">
          <span className="font-medium text-[12px] text-blue-800">ForexTrading</span>
          <span className="text-[12px] text-gray-900 font-bold">₵60,000</span>
          <span className="text-[10px] text-gray-800">8% interest rate</span>
        </div>
        <div className="py-1 px-1 bg-blue-100 rounded-full">
          <FaChartBar className="w-4 h-4 text-blue-700" />
        </div>
      </div>
      {/* Investwise Cap Card */}
      <div className="py-1 px-2 items-center justify-between flex absolute w-35 rounded-lg bg-white -right-7 -bottom-7 shadow-2xl z-20">
        <div className="flex flex-col">
          <span className="font-medium text-[12px] text-violet-500">Investwise Cap</span>
          <span className="text-[12px] text-gray-900 font-bold">₵5,000</span>
          <span className="text-[10px] text-gray-800">7% interest rate</span>
        </div>
        <div className="py-1 px-1 bg-violet-100 rounded-full">
          <FaChartBar className="w-4 h-4 text-violet-700" />
        </div>
      </div>
    </motion.div>
  );
};
export default HeroImageSection;