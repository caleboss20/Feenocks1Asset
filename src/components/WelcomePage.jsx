import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lady1 from "../assets/images/lady1.jpg";
import lady2 from "../assets/images/lady2.jpg";
import lady3 from "../assets/images/lady3.jpg";
import lady4 from "../assets/images/lady4.jpg";
import lady5 from "../assets/images/lady5.jpg";
import lady6 from "../assets/images/lady6.jpg";
import lady7 from "../assets/images/lady7.jpg";
import woman1 from "../assets/images/woman1.jpg";
import woman2 from "../assets/images/woman2.jpg";
import man1 from "../assets/images/man1.jpg";
import family1 from "../assets/images/family1.jpeg";
import family2 from "../assets/images/family2.jpg";
import family3 from "../assets/images/family3.jpg";

import farmer1 from "../assets/images/farmer1.jpg";
import farmer2 from "../assets/images/farmer2.jpg";
import farmer3 from "../assets/images/farmer3.jpg";

import farm1 from "../assets/images/farm1.jpg";
import farm5 from "../assets/images/farm5.jpg";
import farm6 from "../assets/images/farm6.jpg";
import farm4 from "../assets/images/farm4.jpg";

import {MdQuestionMark, MdSupportAgent } from "react-icons/md";



import {Link, useNavigate} from "react-router-dom";


 function WelcomePage() {
  const navigate=useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [show,setShow]=useState(false);

  const slides = [
    {
      image: man1,
      title: "Secure investments for you",
      description: "Smart Investing made simple,secure and transparent",
    },
    {
      image: family1,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-level encryption",
    },
    {
      image: farmer2,
      title: "Sustainable Agribusiness",
     description:"Support food production while earning consistent returns from verified agricultural projects"
    },
    {
      image: family3,
      title: "24/7 Customer Service",
      description: "We are always ready to assist you",
    },
  ];
  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  const currentSlideData = slides[currentSlide];


 //user consent//
 
useEffect(()=>{
 const consent=localStorage.getItem("userconsent");
 if(!consent){
  setShow(true);
 }
},[])








  return (
    <div
      className="w-full h-screen object-cover absolute top-0 left-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >

    {show && 
     <div className="fixed left-6 right-6 bottom-1 top-5 rounded-lg bg-white z-90">
      <div className="flex flex-col items-center px-5">
        <div className="bg-red-200 rounded-lg py-5 px-6 mt-6">
          <MdQuestionMark className="text-red-600 w-7 h-8"/>
        </div>
        <h2 className="text-lg font-medium mt-4 text-gray-800">User Data Consent</h2>
       <div className="mt-4">
        <p className="text-gray-600 text-md">Feenicks1 collects and stores your personal information such as name,email, and address to enable secure account creation and management.
          Feenicks1 also collects analytical data,which helps improve app performance and enhance user interactions and preferences.
        </p>
       </div>

       <div className="mt-4">
        <p className="text-gray-600">We also collects information about the applications installed on your device to provide personalized recommendations and enhance your user experience.We do not share this information with third parties without your consent.</p>
       </div>


       <div className="mt-6">
      <p className="text-gray-600">Do you consent to the collection and use of your personal information and analytical data for these purposes?</p>
      <button 
      onClick={()=>{localStorage.setItem("userconsent","true"); setShow(false)}}
      className="font-medium text-lg bg-green-700 rounded-lg w-full text-white mt-5 py-3">I Agree</button>
       </div>
      
      </div>
      </div>
    }


      <div
      onClick={()=>navigate("/support")} 
      className="absolute top-8 z-50 right-6">
               <MdSupportAgent className="w-10 h-10 text-gray-600"/>
            </div>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={currentSlideData.image}
          className="w-full h-full object-cover"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="fixed inset-0 bg-black/40 flex flex-col items-center justify-center gap-6"></div>
      <div className="p-6 flex flex-col gap-4 fixed bg-black/0 bottom-0 left-0 right-0 w-full h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 20, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            
           
            <h2 className="font-medium text-white text-2xl">
              {currentSlideData.title}
            </h2>
            <p className="font-small text-white text-lg">
              {currentSlideData.description}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="flex gap-3 mt-6 ml-0.5">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-10 h-[5px] ${
                index === currentSlide ? "bg-white" : "bg-gray-500"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex gap-6 mt-8 fixed left-6 right-6 bottom-6">
          <Link to="/signin"className="flex justify-center items-center text-white outline-none font-small  text-lg rounded-lg flex-1 py-4 px-3 border-1 border-white">
           <button >
            Login
          </button>
          </Link>
         
         <Link to="/signup" className="flex justify-center text-white outline-none bg-green-800 font-small  text-lg rounded-lg flex-1 py-4 px-3 border-none">
           <button >
            Sign Up
          </button>
         </Link>
        
        </div>
      </div>
     
    </div>
  );
}
export default WelcomePage;