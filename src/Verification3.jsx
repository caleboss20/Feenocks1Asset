import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiUserLine } from "react-icons/ri";
import { CameraIcon,CheckCircleIcon } from "@heroicons/react/24/solid";
import { AiOutlineCloudUpload } from "react-icons/ai";
import BackArrow from "./components/Backarrow";
import { useLocation, useNavigate } from "react-router-dom";
function Verification3() {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile));
      setScanning(true);
      setVerified(false); // reset verified if re-uploading
    }
  };
  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        setScanning(false);
        setVerified(true);
      }, 10000); // 10 seconds scanning
      return () => clearTimeout(timer);
    }
  }, [scanning]);
  const navigate=useNavigate();
  const goback=()=>{
  navigate("/verification2");
  }
  const gotoNext=()=>{
    navigate("/verification4");
  }
  return (
    <div className="relative w-full h-screen p-8 flex flex-col ">
        <div onClick={goback}>
            <BackArrow />
        </div>
      <div className="max-w-md w-full flex flex-col items-center gap-6">
       <div className="mt-10 flex justify-center flex-col items-center">
        <h2 className="font-medium text-xl mb-10">Scan the front</h2>
        <p className="text-gray-800 text-md text-center">Take a photo of the front of your identity card</p>
       </div>
       
        {/* Upload Box */}
        <motion.label
          whileHover={{ scale: 1.02, borderColor: "#3B82F6" }}
          whileTap={{ scale: 0.98 }}
          className="w-full border-2 border-dashed border-gray-400 rounded-lg p-6 flex items-center justify-center cursor-pointer relative overflow-hidden"
        >
          {file ? (
            <img
              src={file}
              alt="Uploaded"
              className={`max-h-40 object-contain rounded-md transition-filter duration-500 ${
                scanning ? "blur-sm" : ""
              }`}
            />
          ) : (
            <div className="flex flex-col items-center">
              <RiUserLine className="w-12 h-12 text-gray-300" />
              <AiOutlineCloudUpload className="w-16 h-16 text-gray-400 mt-2" />
              <span className="text-gray-500 mt-2">Click or drag to upload</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {/* Scanning animation */}
          {scanning && file && (
            <motion.div
              className="absolute left-0 right-0 top-0 h-2 bg-green-400 opacity-70 shadow-lg rounded-sm"
              initial={{ y: 0 }}
              animate={{ y: "100%" }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }}
            />
          )}
        </motion.label>
        {/* Take Photo Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex mt-4 justify-center items-center gap-4 w-full py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-700 font-medium transition-colors"
        >
            <CameraIcon className="w-8 h-8"/>
          <span>Take Photo</span>
        </motion.button>
            {/* Verified Text */}
        {verified && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-green-600 font-medium text-lg mt-2"
          >
            <CheckCircleIcon className="w-10 h-10"/>
           <span>Verified</span> 
          </motion.p>
        )}
      
        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: verified ? 1 : 0, y: verified ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          disabled={!verified}
          onClick={verified? gotoNext:null}
          className={`w-full py-3 bg-[#0b3c39] rounded-lg text-white font-medium pointer-events-${
            verified ? "auto" : "none"
          } mt-4`}
        >
          Continue
        </motion.button>
      
      </div>
    </div>
  );
}
export default Verification3;