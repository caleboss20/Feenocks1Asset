import { MdErrorOutline, MdOutlineIosShare } from "react-icons/md";
import { FiShare2 } from "react-icons/fi";
import { RiShareForwardLine } from "react-icons/ri";
import { FiCopy, FiInfo } from "react-icons/fi";
import { useState, useEffect } from "react";
import BackArrow from "./Backarrow";
import { useNavigate } from "react-router-dom";

function Referral({ profileName}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [key, setKey] = useState("");
  // Generate a random 8-character alphanumeric code
  const generateReferralCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };
  // Generate referral link when component mounts
  useEffect(() => {
    const code = generateReferralCode();
    setReferralCode(code);
    setKey(`https://feenicks.com/ ${profileName||""}?ref=${code}`);
  }, []);
  // Copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 6000);
  };
  // Native share
  const handleShare = async () => {
    if (navigator.share && copied) {
      try {
        await navigator.share({
          title: "Join me & earn GH₵ 20",
          text: "Use my referral link to get GH₵ 20 off and start saving!",
          url: key,
        });
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
      
    } 
   
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 mt- ">
        <div onClick={() => navigate("/dashboard")}>
          <BackArrow />
        </div>
        <h2 className="mt-4 text-lg font-medium text-[#2f5d50] ml-2">
          Refer a friend
        </h2>
        <p className="text-gray-600 text-md font-medium ml-2">
          And you can both save GH₵ 20.
        </p>
        <div className="flex items-center gap-3  ml-2">
          <MdErrorOutline className="text-[#2f5d50] h-5 w-5 mt-5.5" />
          <h2 className="text-[#2f5d50] font-medium text-md mt-5">
            How it works
          </h2>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-5 py-2 items-center bg-gra-100 w-full mt-6">
            <div className="py-3 px-5 bg-white shadow-2xl rounded-full flex justify-center items-center">
              <span className="font-bold text-[#2f5d50] text-lg">1</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-medium">Invite your friends</h2>
              <span className="text-gray-600 text-sm">
                Just share your link
              </span>
            </div>
          </div>
          <div className="px-6.5 flex flex-col gap-2">
            <div className="w-[2px] bg-gray-400 h-2"></div>
            <div className="w-[2px] bg-gray-400 h-2"></div>
            <div className="w-[2px] bg-gray-400 h-2"></div>
          </div>

          <div className="flex gap-5 py-2 items-center bg-gra-100 w-full mt-0">
            <div className="py-3 px-5 bg-white shadow-2xl rounded-full flex justify-center items-center">
              <span className="font-bold text-[#2f5d50] text-lg">2</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-medium">They hit the road</h2>
              <span className="text-gray-600 text-sm">with GH₵ 20 off</span>
            </div>
          </div>
          <div className="px-6.5 flex flex-col gap-2">
            <div className="w-[2px] bg-gray-400 h-2"></div>
            <div className="w-[2px] bg-gray-400 h-2"></div>
            <div className="w-[2px] bg-gray-400 h-2"></div>
          </div>

          <div className="flex gap-5 py-2 items-center bg-gra-100 w-full mt-0">
            <div className="py-3 px-5 bg-white shadow-2xl rounded-full flex justify-center items-center">
              <span className="font-bold text-green-400 text-xl">3</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-md font-medium">You make savings!</h2>
              <span className="text-gray-600 text-sm">
                Then you get GH₵ 20 off🎉
              </span>
            </div>
          </div>
        </div>
        <div className="py-2 px-2 mt-6 w-full flex bg-green-100 rounded-lg gap-2">
          <div className="flex-1">
            <p className="text-sm text-green-700">{key}</p>
          </div>
          <div>
            <button onClick={handleCopy} className="outline-none">
              {copied ? (
                <span className="text-green-700">copied!</span>
              ) : (
                <span className="font-bold text-green-700 text-md">copy</span>
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleShare}
          className={` gap-10 flex justify-center items-center py-3 px-2  ${
            copied ? "bg-green-700" : "bg-gray-200"
          } font-medium mt-5 rounded-lg text-white`}
        >
          <span>
            <MdOutlineIosShare className="w-5 h-5" />
          </span>
          <span>Refer friends now</span>
        </button>
        :<p></p>
      </div>
    </div>
  );
}
export default Referral;
