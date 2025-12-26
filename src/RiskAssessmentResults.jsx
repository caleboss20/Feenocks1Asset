import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiTrendingUp,
  FiActivity,
  FiShield,
  FiRefreshCcw,
  FiArrowUpRight,
  FiAnchor,
  FiAlertCircle,
  FiTriangle,
  FiTrendingDown,
  FiClock
} from "react-icons/fi";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PieChartRecommendation from "./components/PieChart";
export default function RiskAssessmentResults({selectedId}) {
  const [isMounted, setIsMounted] = useState(false); 
   const navigate = useNavigate();
   useEffect(() => {
     const timer=setTimeout(()=>{
      setIsMounted(true);
     },3000) 
     return ()=>clearTimeout(timer);
     // component has mounted
   }, []);

  return (
    <div className="w-full bg-white">
      <div className="pb-15 w-full bg-gray-100 pt-10 p-6">
        <FiBarChart2 size={42} className="text-bold" />
        <h2 className="font-bold text-4xl mt-5">Your Risk Profile</h2>
        <p className="text-sm text-gray-700 mt-3 text-lg">
          This assessment helps you choose risk levels for your goals and
          ensures you’re not taking on more risk than you are prepared for.
        </p>
        <Link to="/assessment">
          <button className="flex gap-4 items-center rounded-full py-3 px-6 bg-blue-600 text-white font-medium mt-6">
            Retake the Assessment
            <FiArrowUpRight size={22} />
          </button>
        </Link>
      </div>

      <div className="p-6">
        <h2 className=" font-medium text-black mb-10">RISK TOLERANCE</h2>
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-gray-400 ">
                <FiTrendingUp />
              </div>
              <p>Level</p>
            </div>

            <div className="py-2 px-4 bg-red-100 rounded-full">
              <span className="text-red-500">High</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-gray-400 ">
                <FiArrowUpRight />
              </div>
              <p>Return Preference</p>
            </div>

            <div className=" bg-red-00 rounded-full">
              <span className="text-black font-medium">High Potential</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-gray-400 ">
                <FiActivity />
              </div>
              <p>Market Fluctuation</p>
            </div>

            <div className=" rounded-full">
              <span className="text-black font-medium">Tolerant</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-gray-400 ">
                <FiShield />
              </div>
              <p>Response</p>
            </div>

            <div className=" rounded-full">
              <span className="text-black font-medium">Calm,Patient</span>
            </div>
          </div>

         

          <div className="w-full h-[1px] bg-gray-300 mt-5"></div>
          <div>
            <h2 className="font-medium text-black mb-10">VOLATILITY CONCERN</h2>
            <div className="flex flex-col gap-10">
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-gray-400 ">
                    <FiActivity />
                  </div>
                  <p>Level</p>
                </div>

                <div className="py-2 px-4 bg-gray-100 rounded-full">
                  <span className="text-gray-800 font-medium">Mild</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="flex items-center justify-center rounded-full h-9 w-9 border-2 border-gray-400 ">
                    <FiClock />
                  </div>
                  <p>Investment Outlook</p>
                </div>

                <div className=" rounded-full">
                  <span className="text-black font-medium">Long term goals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
       <div className="w-full h-[1px] bg-gray-300 mt-5"></div>
          <div className="p-5">
            <h2 className="font-medium text-black mt-10">RECOMMENDED PORTFOLIO</h2>
          </div>
         <PieChartRecommendation />

        {isMounted && (
          <>
          <div className="flex justify-center">
        <motion.button
          onClick={()=>navigate("/recommendation")}
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.5 }}
          className="mb-5 p-5 px-34 py-3 bg-blue-600 rounded-lg text-white font-medium text-lg "
        >
          Continue
        </motion.button>
        </div>
        </>
        )}
    
    </div>
  );
}
