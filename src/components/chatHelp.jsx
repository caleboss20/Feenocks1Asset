import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import {MdQuestionMark  } from "react-icons/md";

function ChatHelp() {
  const navigate=useNavigate();
  return (
    <>
    <div className="relative">
      <div
      onClick={()=>navigate("/support")} 
      className="fixed shadow-2xl right-3 flex justify-center items-center bottom-2 w-12 h-12 rounded-full bg-[#0b3c49]">
        <MdQuestionMark className="w-6 h-6 text-white " />
      </div>
    </div>
     {/* <div className="flex items-center justify-center w-70 h-10 rounded-md shadow-md bg-yello-500 absolute bottom-14 right-18">
        <span className="text-lg">👋 Hi Need Help?</span>
     </div> */}
    </>
  );
}
export default ChatHelp;
