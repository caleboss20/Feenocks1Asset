import { useState } from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function SocialInfo() {
  const navigate=useNavigate();
  const [selected,setSelected]=useState(null);
  const [detail, setDetail] = useState([
    {
      id: crypto.randomUUID(),
      name: "A Person or Company I paid",
    },
    {
      id: crypto.randomUUID(),
      name: "Friend or family",
    },
    {
      id: crypto.randomUUID(),
      name: "Search engine ( Google, Bing )",
    },
    {
      id: crypto.randomUUID(),
      name: " Online Adertisement ( Google Ads etc. )",
    },
    {
      id: crypto.randomUUID(),
      name: "Facebook",
    },
    {
      id: crypto.randomUUID(),
      name: "Twitter",
    },
    {
      id: crypto.randomUUID(),
      name: "Instagram",
    },
    {
      id: crypto.randomUUID(),
      name: "Other",
    },
  ]);


  return (
    <div className="w-full bg-yello-400 p-5">
      <div className="w-full h-20">
        <Navbar />
      </div>

      <div className="mt-15">
        <h2 className="font-medium text-2xl">How did you hear about Us?</h2>
        <div className="mt-10">
          <p className="text-gray-700 text-sm">
            How did you hear about Feenicks1?
          </p>
          <div className="flex flex-col gap-5 mt-6">
            {detail.map((item) => (
              <div
                key={item.id}
                onClick={()=>setSelected(item)}
                className={`${selected===item?'border-2 border-blue-400': 'border-gray-400' } pl-5 border-1 rounded-lg py-6 flex items-center gap-4 w-full h-10 bg-viole-500`}
              >
                <input 
                checked={selected===item}
                onChange={()=>setSelected(item)}
                type="radio" className="w-5 h-5 accent-blue-600" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
  
    {selected && (
        <motion.button
          onClick={()=>navigate("/verification")} 
          initial={{ opacity: 0, y: 20 }}
          animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-10 w-full px-4 py-3 bg-blue-600 rounded-lg text-white font-medium text-lg "
        >
          Continue
        </motion.button>
      )}

        </div>
      </div>
    </div>
  );
}
export default SocialInfo;
