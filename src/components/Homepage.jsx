import {
  ArrowRightIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import image1 from "../assets/images/bestfamily.webp";
import image2 from "../assets/images/family-savings.png";



import Button from "./Button";
import CardMarquee from "./marquee";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import FAQsection from "./FAQsection";
import Footer from "./Footer";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import Navbar from "./Navbar";
import { MdQuestionMark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Cookie from "./Cookie";
import { useState } from "react";
import { FaBuilding, FaChartBar } from "react-icons/fa";
import { GiPlantSeed } from "react-icons/gi";
import ScrollingNeedHelpBox from "./chatHelp";
import HeroImageSection from "./HeroImagesection";
import PredictionAmount from "./PredictionAmount";

function Homepage() {
  const [decline, setDecline] = useState(true);
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setDecline(true); // show banner
    }
  }, []);
  const navigate = useNavigate();

  const target = 50000; //  amount
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 200000; //  seconds
    const stepTime = Math.floor(duration / 500); // time per increment
    const interval = setInterval(() => {
      start += 1000; // increment amount (adjust as needed)
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(start);
    }, stepTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
       
     <div className="">
      <Navbar />

       <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0B3219]" />
      <div className="absolute inset-0 bg-[#e6f2ef] backdrop-blur-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-emerald-200/20" />
     
      <motion.div
        className="relative z-10 w-full py-10 flex flex-col justify-center items-center p-5 mt-30"
        initial={{ opacity: 0.3, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-slate-900 text-center leading-normal mb-6">
          Powering the Next Generation of Global Investing.
        </h2>
        <p className="text-lg text-slate-700 text-center mb-8 max-w-2xl">
          Invest confidently across markets with secure, transparent access to
          public offers and growth assets.
        </p>
        <div className="inset-0 bg-black/1">
          {/* Floating Container with Image */}
        <HeroImageSection />
          <div className="flex justify-center mt-30">
             <Button />
          </div>
          
        </div>
      </motion.div>
      {/* Floating support button */}
      <ScrollingNeedHelpBox />
    
    </section>

      {/*getting started section*/}
      <section>
        <div className="mt-0 w-full h-460 bg-[#fafafa] flex flex-col p-10">
          <div className="mt-35 flex gap-10 flex-col items-center justify-center w-full bg-300 pb-13 ">
            <div className="text-gray-900 bg-[#e6f2ef] font-light text-base px-7 py-3 rounded-full ">
              HOW TO GET STARTED
            </div>
            <h2 className="text-2xl font-medium">Invest in minutes</h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
            viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
            transition={{ duration: 0.9, ease: "easeOut" }} //
            className="mt-0 flex gap-10 flex-col items-center justify-center w-full bg-re-300 pb-13 "
          >
            <div className="w-10 h-10 p-7 text-xl flex justify-center items-center text-white font-medium text-base rounded-full  bg-[#0b3c49] border-6 ">
              <span>1</span>
            </div>
            <h2 className="text-2xl font-medium">Sign up</h2>
            <h2 className="text-center font-small">
              Create a personal account in a few clicks,it's that simple
            </h2>
          </motion.div>

          <div className="w-full h-35 bg--300 mt-2 flex flex-col justify-center items-center">
            <div className="w-1 h-60 bg- bg-[#e6f2ef]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
            viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
            transition={{ duration: 0.9, ease: "easeOut" }} //
            className="mt-10 flex gap-10 flex-col items-center justify-center w-full  pb-13 "
          >
            <div className="w-10 h-10 p-7 text-xl flex justify-center items-center text-white font-medium text-base rounded-full bg- bg-[#0b3c49] border-6 ">
              <span>2</span>
            </div>
            <h2 className="text-2xl font-medium">Verification</h2>
            <h2 className="text-center font-small">
              We'll verify your information securely to protect your
              account,then you'll be ready to start investing.
            </h2>
          </motion.div>

          <div className="w-full h-35 bg-300 mt-2 flex flex-col justify-center items-center">
            <div className="w-1 h-60 bg- bg-[#e6f2ef]"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
            viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
            transition={{ duration: 0.9, ease: "easeOut" }} //
            className="mt-10 flex gap-10 flex-col items-center justify-center w-full bg-100 pb-13 "
          >
            <div className="w-10 h-10 p-7 text-xl flex justify-center items-center text-white font-medium text-base rounded-full bg- bg-[#0b3c49] border-6 border- ">
              <span>3</span>
            </div>
            <h2 className="text-2xl font-medium">Invest</h2>
            <h2 className="text-center font-small">
              Once your account is verified go live with a click of a button and
              start investing seamlessly with FEENICKS1.
            </h2>
          </motion.div>
        </div>
      </section>

<section>
  <PredictionAmount />
</section>
      {/*benefits section */}

      <section className="mt-40">
        <motion.div
          initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
          whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
          viewport={{ once: true, amount: 0.6 }} // animate once when 30% in view
          transition={{ duration: 0.6, ease: "easeOut" }} //
          className="mt-0 w-full h-140 bg--300 flex flex-col p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
            viewport={{ once: true, amount: 0.6 }} // animate once when 30% in view
            transition={{ duration: 0.9, ease: "easeOut" }} //
            className="flex flex-col w-full  bg--400"
          >
            <div className="w-full  ">
              <div className="pl-4 mt-10 w-40 text-center flex flex-col justify-center items-center rounded-full h-10 bg- bg-[#e6f2ef] ">
                OUR BENEFITS
              </div>
            </div>
            <h2 className="mt-10 text-5xl leading-normal font-normal">
              Investing in Africa's Top Businesses,is now at your fingertips{" "}
            </h2>
          </motion.div>
        </motion.div>
      </section>

      {/*Investments options section */}

      <section>
        <div className=" mt-10 w-full bg--300 gap-20 flex flex-col pl-6 pr-6 ">
          <div className="md:flex flex-row gap-20">
            <motion.div
              className="flex-1 bg-viole-500 rounde mt-10 mt-6 w-full shadow-xl flex flex-col p-6"
              initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
              whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
              viewport={{ once: true, amount: 0.3 }} // animate once when 30% in view
              transition={{ duration: 0.6, ease: "easeOut" }} // smooth animation
            >
              <div className="px-3 py-2 rounded-full bg- bg-blu-200">
                Diverse Investment Options
              </div>
              <h2 className="font-medium text-4xl leading-normal mt-12">
                See, Click, Invest!
              </h2>
              <p className="font-small text-lg mt-12">
                Join millions around the world growing wealth through Africa's
                leading companies in a few clicks
              </p>
              <div className="items-center mt-32 text-lg rounded-lg ">
                <Button />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
              whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
              viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
              transition={{ duration: 0.9, ease: "easeOut" }} //
              className="flex-1 rounde bg-500 mt-10 mt-6 w-full flex  shadow-xl  flex flex-col p-6 "
            >
              <div className="px-3 py-2 rounded-full ">
                Effortless Transaction
              </div>
              <h2 className="font-medium text-4xl leading-normal mt-12">
                Effortless Transaction Experience
              </h2>
              <p className="font-smsall text-lg mt-12 ">
                Enjoy a hassle-free investment experience with our platform's
                streamlined processes.From account setup to investment
                execution,our intuitive interface ensures every step is simple
                and straightforward
              </p>
              {/* <div className="flex gap-5 items-center mt-12 px-3 py-6 text-lg rounded-lg  bg-gradient-to-r from- bg-blue-200 to- bg-blue-400">
              Become An Elite Investor{" "}
              <span>
                <ArrowRightIcon className="w-6 h-6" />
              </span>
            </div> */}
              <Button />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
              whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
              viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
              transition={{ duration: 0.9, ease: "easeOut" }} //
              className="flex-1 rounde mt-10 mt-6 w-full flex shadow-xl flex flex-col pt-6 pl-6 pr-6 pb-6"
            >
              <div className="px-3 py-2 rounded-full bg-gree-200">
                Enhanced Security Measures
              </div>
              <h2 className="font-medium text-4xl leading-normal mt-12">
                Advanced Security Protocols
              </h2>
              <p className="font-small text-lg mt-12 ">
                Enjoy a hassle-free investment experience with our platform's
                streamlined processes.From account setup to investment
                execution,our intuitive interface ensures every step is simple
                and straightforward
              </p>
              {/* <div className="flex gap-5 items-center mt-12 px-3 py-6 text-lg rounded-lg  bg-gradient-to-r from- bg-blue-200 to- bg-blue-400">
              Become An Elite Investor{" "}
              <span>
                <ArrowRightIcon className="w-6 h-6" />
              </span>
            </div> */}
              <Button />
            </motion.div>
          </div>

          <div className="flex flex-col gap-30">
            <img
              src={image2}
              className="shadow-xl mt-10 bg-gradient-to-r from- bg-blue-300 to- bg-blue-100 w-full h-90 rounded-2xl flex bg-gree-100 flex flex-col "
            ></img>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
              whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
              viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
              transition={{ duration: 0.9, ease: "easeOut" }} //
              className=" w-full rounded- mt-20 bg-gradient-to-r from- bg-[#0b3c49] to- bg-[#0b3c49]  p-6 pb-10"
            >
              <h2 className="text-5xl leading-normal text-white font-medium">
                Widening Financial Inclusion
              </h2>
              <p className="mt-3 text-lg leading-normal text-[#fafafa] font-small">
                Feenicks1 Solutions Limited helps you invest in Bitcoin Forex
                Trading Agribusiness and Real Estate with huge returns.Join the
                community of Investors now
              </p>
              
              <Button />
            </motion.div>
          </div>
          {/**teaser */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
            viewport={{ once: true, amount: 0.8 }} // animate once when 30% in view
            transition={{ duration: 0.9, ease: "easeOut" }} //
            className="flex items-center justify-center mt-50 h-50 w-full bg-volet-500"
          >
            <h2 className="text-5xl text-black leading-normal text-center">
              Your future grows when you start today.
            </h2>
          </motion.div>

          {/** for the marquee*/}
          <CardMarquee />

          {/**for the calculation part */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
            whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
            viewport={{ once: true, amount: 0.6 }} // animate once when 30% in view
            transition={{ duration: 0.6, ease: "easeOut" }} //
            className="flex flex-col gap-10 w-full bg-gradient-to-r from- bg-[#0b3c49] to- bg-[#0b3c49] p-6 pt-15 mt-20"
          >
            <div className="w-full bg-orang-500 p-2">
              <motion.h2
                initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
                whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
                viewport={{ once: true, amount: 0.6 }} // animate once when 30% in view
                transition={{ duration: 0.6, ease: "easeOut" }} //
                className="text-5xl leading-normal text-white font-medium"
              >
                Time really is money
              </motion.h2>
              <p className="mt-3 opacity-70 text-xl leading-normal text-[#fafafa] font-small">
                Feenicks1 Solutions Limited helps you invest in Bitcoin Forex
                Trading Agribusiness and Real Estate with huge returns.Join the
                community of Investors now
              </p>
              <button className="rounded-sm px-8 py-3 mt-10 bg-white font-small text-xl">
                Start investing
              </button>
            </div>
          </motion.div>
          {/**the FAQ section */}

          <section>
            <motion.div
              initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
              whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
              viewport={{ once: true, amount: 0.6 }} // animate once when 30% in view
              transition={{ duration: 0.6, ease: "easeOut" }} //
              className=" flex bg-rd-400 flex-col gap-10 w-full bg-gradient-to-r from-gree-600 to-gree-600 p-6 pt-15 mt-10"
            >
              <div className="pl-4 mt-10 w-20 font-medium flex flex-col justify-center  rounded-full h-10 bg- bg-[#e6f2ef] ">
                <span>FAQs</span>
              </div>
              <h2 className="text-4xl leading-normal">
                You've got questions,we have the answers.
              </h2>
              <span className="text-lg">
                Find answers to your most pressing questions about our products
                and services.
              </span>
              <button className="border-none outline-none flex justify-center items-center text-lg mt-12 px-20 py-4 bg- bg-[#0b3c49] text-white rounded-sm">
                View all
                <span>
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }} // start invisible, 50px below
              whileInView={{ opacity: 1, y: 0 }} // animate to visible, y=0
              viewport={{ once: true, amount: 0.6 }} // animate once when 30% in view
              transition={{ duration: 0.6, ease: "easeOut" }} //
              className="mb-30 mt-20"
            >
              <FAQsection />
            </motion.div>
          </section>

          <section>
            <div className="w-full bg-[#0b3c49] ">
              <Footer />
            </div>
          </section>
        </div>
      </section>

      <section>
        {decline && <Cookie decline={decline} setDecline={setDecline} />}
      </section>
    </div>
    </div>
  );
}

export default Homepage;
