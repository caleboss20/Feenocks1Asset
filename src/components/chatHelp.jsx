import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
function ChatHelp() {
  return (
    <>
    <div className="relative">
      <div className="fixed shadow-2xl right-3 flex justify-center items-center bottom-10 w-15 h-15 rounded-full bg-blue-600">
        <ChatBubbleBottomCenterIcon className="w-8 h-8 text-white " />
      </div>
    </div>
     <div className="flex items-center justify-center w-70 h-10 rounded-md shadow-md bg-yello-500 absolute bottom-14 right-18">
        {/* <span className="text-lg">👋 Hi Need Help?</span> */}
     </div>
    </>
  );
}
export default ChatHelp;
