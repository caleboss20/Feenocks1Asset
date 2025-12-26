import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Recommendation() {
  const navigate=useNavigate();
    const packages=[
      {
        name:"Forex Trading Capital",
        price:"",
        description:"",
        ticker:"",
        
      },
      {
        name:"Investwise Capital",
        price:"",
        description:"",
        ticker:"",
      },
      {
        name:"Mutual Fund Capital",
        price:"",
        description:"",
        ticker:"",
      },
      {
        name:"Real Estate Capital",
        price:"",
        description:"",
        ticker:"",
      },
      {
        name:"Bitsusu Capital",
        price:"",
        description:"",
        ticker:"",
      },
      {
        name:"Agribusiness Capital",
        price:"",
        description:"",
        ticker:"",
      },
    ]

    return (
    <div className="w-full bg-gray-100">
      <div className="w-full h-30 ">
        <Navbar />
      </div>
      <div className="w-full p-4 mt-5 h-50 bg-orang-400">
        <h2 className="text-left pl-4 leading-normal text-3xl font-medium mb-12">
          Let's Choose Your Investment Packages
        </h2>
        <span className="text-center pl-4 text-gray-700">
          Our recommendation based on your risk profile
        </span>
        
      </div>

        <div className="p-6 flex flex-col gap-4">
          {packages.map(item=>
           <div key={item.name
           }
           className="w-full rounded-lg bg-white h-50"
           ></div>
          )}

            <motion.button
          onClick={()=>navigate("/deposit")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 40 }}
          transition={{ duration: 0.5 }}
          className="mb-5 p-5 px-34 py-3 bg-blue-600 rounded-lg text-white font-medium text-lg "
        >
          Continue
        </motion.button>
        
        </div>

        



    </div>
  );
}
export default Recommendation;
