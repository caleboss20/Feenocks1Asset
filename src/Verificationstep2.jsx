import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiIdCardLine } from "react-icons/ri";
import { MdOutlineBadge, MdDirectionsCar } from "react-icons/md";
import { FaPassport } from "react-icons/fa";
import BackArrow from "./components/Backarrow";

function Verification2({selectedId,setSelectedId}) {
  
  const [isMounted, setIsMounted] = useState(false); // for hydration-safe motion
  const navigate = useNavigate();
  useEffect(() => {
    setIsMounted(true); // component has mounted
  }, []);
  const handleContinue = () => {
    if (selectedId) {
      navigate("/verification3", { state: { selectedId } });
    }
  };

  const goback=()=>{
  navigate("/verification");
  }

  return (
    <>
    <div className="w-full h-screen bg-rd-400 p-8">
       <div onClick={goback}>
            <BackArrow />
        </div>

      <div className="mt-25">
        <div className="gap-4 w-full bg-gree-500 flex justify-center items-center flex-col">
          <RiIdCardLine className="w-26 h-26 text-blue-600"/>
          <p className="font-medium text-xl">We need a photo of your ID</p>
          <p className="text-lg mt-3 text-gray-600">
            For the Ghanaians please select one of the following identity document types:
          </p>
          <div className="flex flex-col w-full mt-8 gap-6">
            <motion.div
              onClick={() => setSelectedId("Driver's License")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex gap-4 pl-4 items-center h-15 w-full border-1 rounded-sm cursor-pointer ${
                selectedId === "Driver's License" ? "border-blue-500" : "border-gray-400"
              }`}
            >
              <MdDirectionsCar className="w-7 h-7 text-blue-600"/>
              <p>Driver's License</p>
            </motion.div>
            <motion.div
              onClick={() => setSelectedId("Ghana Card")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex pl-4 items-center gap-4 h-15 w-full border-1 rounded-sm cursor-pointer ${
                selectedId === "Ghana Card" ? "border-blue-500" : "border-gray-400"
              }`}
            >
              <RiIdCardLine className="w-7 h-7 text-blue-600"/>
              <p>Ghana Card</p>
            </motion.div>
            <motion.div
              onClick={() => setSelectedId("Passport")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex pl-4 items-center gap-4 h-15 w-full border-1 rounded-sm cursor-pointer ${
                selectedId === "Passport" ? "border-blue-500" : "border-gray-400"
              }`}
            >
              <FaPassport className="w-7 h-7 text-blue-600"/>
              <p>Passport</p>
            </motion.div>
            <motion.div
              onClick={() => setSelectedId("Residency Card(US)")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`flex pl-4 items-center gap-4 h-15 w-full border-1 rounded-sm cursor-pointer ${
                selectedId === "Residency Card(US)" ? "border-blue-500" : "border-gray-400"
              }`}
            >
              <MdOutlineBadge className="w-7 h-7 text-blue-600"/>
              <p>Residency Card(US)</p>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Hydration-safe motion button */}
      {isMounted && (
        <motion.button
          onClick={handleContinue}
          initial={{ opacity: 0, y: 20 }}
          animate={selectedId ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-20 w-full px-4 py-3 bg-blue-600 rounded-lg text-white font-medium text-lg "
        >
          Continue
        </motion.button>
      )}
    </div>
   
    </>
  );
}
export default Verification2;