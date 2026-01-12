import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


function Splashscreen(){
    const navigate=useNavigate();
    useEffect(()=>{
   const timer=setTimeout(()=>{
    navigate("/welcomepage")
   },4000)
   return()=>clearTimeout(timer);
    },[]);


 return(
    <div className="bg-[#e6f2ef] w-screen h-screen flex justify-center items-center">
     <motion.h2
     initial={{opacity:0,scale:0.9}} 
     animate={{opacity:1,scale:1}}
     transition={{duration:1.5,ease:"easeOut"}}
     className="font-medium text-3xl text-gray-900">Feenicks1
     </motion.h2>
    </div>
 )
}
export default Splashscreen;