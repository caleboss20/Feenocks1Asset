import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HiChevronRight } from "react-icons/hi";
import { FaRegPaperPlane } from "react-icons/fa";
import { MdOutlineSend } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function SupportCenter() {
    const navigate=useNavigate();
  return (
    <div className="w-full">
      <div className="z-1 flex gap-2 justify-between w-full h-60 bg-gradient-to-r from-bg-blue-700 to- bg-blue-900 p-4">
        <div>
          <h2 className="mt-5 leading-normal text-2xl text-white font-medium">
            Hi there 👋
            <p>How can we help?</p>
          </h2>
        </div>
        <div
        onClick={()=>navigate("/")} 
        className=" w-6 h-6 rounded-lg bg-blu-900 py-5 px-5 flex items-center justify-center">
          <span className="text-3xl text-white">&times;</span>
        </div>
      </div>

      <div className="p-4 relative w-full bg-gra-400">
        <div className="p-4 -mt-22 z-50 w-full bg-white rounded-lg shadow-xl">
          <h2 className="font-medium text-lg text-gray-800">Got questions?</h2>
          <div className="gap-4 pr-1 py-1 w-full h-12 border-1 mt-5 flex rounded-lg border-gray-600">
            <input
              type="text"
              placeholder="Search for help"
              className="text-gray-800 pl-4 flex-1 outline-none"
            />
            <div className="flex justify-center items-center w-10 bg-blue-600 rounded-lg">
              <MagnifyingGlassIcon className="text-white w-6 h-6" />
            </div>
          </div>

          <div className="mt-10">
            <div className="mt-10 flex justify-between gap-10 items-center">
              <p className="font-small">
                How much interest will my investment earn?
              </p>
              <div>
                <HiChevronRight className="font-bold w-7 h-7" />
              </div>
            </div>
            <div className="mt-10 flex gap-10  justify-between items-center">
              <p className="font-small">
                How do I reset my password if I forgot it?
              </p>
              <div>
                <HiChevronRight className="font-bold w-7 h-7" />
              </div>
            </div>
            <div className="mt-10 flex gap-10 items-center  justify-between">
              <p className="font-small">Why hasn't my deposit reflected?</p>
               <div>
                <HiChevronRight className="font-bold w-7 h-7" />
              </div>
            </div>
            <div className="mt-10 flex gap-10 items-center  justify-between">
              <p className="font-small">What is Feenicks1 ID Number?</p>
              <div>
                <HiChevronRight className="font-bold w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
        <div className="pr-4 pl-4 justify-between flex items-center w-full h-20 mt-5 rounded-lg bg-white shadow-lg">
          <p className="font-medium">Send us a message</p>
          <MdOutlineSend className="" />
        </div>
      </div>
    </div>
  );
}
export default SupportCenter;
