import { BellIcon } from "@heroicons/react/24/outline";
import BackArrow from "../components/Backarrow";
import { MdSupportAgent } from "react-icons/md";
import farmer2 from "../assets/images/farmer2.jpg";
import btc1 from "../assets/images/btc1.jpg";
import btc2 from "../assets/images/btc2.jpg";
import { GiWheat } from "react-icons/gi";
import { FaBitcoin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Packages() {
    const navigate=useNavigate();
  const packages = [
    {
      heading: "AgriBusiness",
      img: farmer2,
      name: "AgriBusiness",
      description:
        "Invest in agribusiness and grow your money while supporting food and animal production.",
      buttonText: "Start now",
      bgcolor: "bg-gradient-to-r from-green-600/20 via-[#0f2a44]/70 to-transparent",
      icon: GiWheat,
    },
    {
      heading: "Bitcoin",
      img: btc2,
      name: "Bitsusu",
      description:
        "Put your money into Bitcoin, the original cryptocurrency. Watch your investment grow as the market evolves. Easy, secure and accessible for everyone.",
      buttonText: "Start now",
      bgcolor:
        "bg-gradient-to-r from-black/40 via-yellow-900/30 to-black/30",
      icon: FaBitcoin,
    },
    // Add more packages here
  ];
  return (
    <div>
      {/* Header */}
      <div className="flex p-4 items-center justify-between">
        <div className="flex gap-10 items-center">
            <div onClick={()=>navigate("/dashboard")}>
                <BackArrow />
            </div>
       
        <h2 className="font-medium text-xl">Hi, Caleb</h2>
        </div>
        
        
        <div className="flex gap-5 items-center">
          <MdSupportAgent className="w-6 h-6" />
          <BellIcon className="w-6 h-6" />
        </div>
      </div>
      {/* Intro */}
      <div className="p-6 flex flex-col gap-2">
        <h2 className="font-medium text-lg">Invest</h2>
        <p className="text-gray-700">
          Choose any of Feenicks1 investment options to start investing in. Don't know which one to choose?{" "}
          <span className="text-gray-600 font-medium">Tap here</span>
        </p>
      </div>
      {/* Packages */}
      <div className="flex flex-col gap-16 p-6">
        {packages.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index}>
              <h2 className="font-medium text-xl mb-5">{item.heading}</h2>
              <div className="relative rounded-2xl overflow-hidden w-full">
                {/* Background image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover object-right"
                />
                {/* Gradient overlay */}
                <div className={`absolute inset-0 ${item.bgcolor}`} />
                {/* Content */}
                <div className="relative z-10 p-5 text-white flex flex-col justify-between h-full">
                  <div className="flex items-center gap-2">
                    {Icon && (
                      <div className="rounded-full bg-white/20 p-2">
                        <Icon className="w-5 h-5" />
                      </div>
                    )}
                    <h3 className="text-lg font-bold">{item.name}</h3>
                  </div>
                  <p className="text-md mt-4 opacity-100 max-w-[250px]">{item.description}</p>
                  <button className="py-3 px-6 bg-white rounded-lg text-gray-700 font-medium mt-4 w-max">
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Packages;