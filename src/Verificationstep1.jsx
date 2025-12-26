import { BoltIcon,LockClosedIcon,} from "@heroicons/react/24/solid";
import {MdVerifiedUser} from "react-icons/md";
import {AiOutlineIdcard} from "react-icons/ai";
import {RiIdCardLine} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";

function Verification(){
    const navigate=useNavigate();
    const next=()=>{
     navigate("/verification2");
    }
 return(
    <div className="w-full bg--400 p-8">
           {/* <Navbar /> */}
           <div className=" mt-5">
            <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex justify-center items-center w-25 h-25 bg-blue-200 rounded-full mb-3">
                <RiIdCardLine className="w-13 h-13 text-blue-800" />
            </div>
           <p className="text-2xl text-gray-800 font-medium text-center">To continue,we need to verify your identity</p>
          </div>
          <div className="w-full h-[1px] bg-gray-200 mt-7"></div>
         <div>
            <div className="flex gap-5 mt-10">
                <div className="h-14 w-14  rounded-full bg-blue-100 flex justify-center items-center "><BoltIcon className="w-6 h-6 text-blue-600" /></div>
                <div className="flex-1 flex flex-col gap-1">
                    <h2 className="text-black font-medium text-xl">Fast and secure</h2>
                    <p className="text-gray-700 text-md">This only takes a couple of minutes and is protected with encryption</p>
                </div>
            </div>
             <div className="flex gap-5 mt-10">
                <div className="h-14 w-14  rounded-full bg-blue-100 flex justify-center items-center "><LockClosedIcon className="w-6 h-6 text-blue-600" /></div>
                <div className="flex-1 flex flex-col gap-1">
                    <h2 className="text-black font-medium text-xl">Data used to verify you</h2>
                    <p className="text-gray-700 text-md">
                        Information yoy provide,data about your device and your behavior 
                    </p>
                </div>
            </div>
         </div>

         <div className="mt-40 flex flex-col gap-4 w-full h-45 bg-viole-300 p-6">
            <p className=" text-center text-md text-gray-600">By selecting "continue" you agree to the <span className="underline">Terms</span></p>
            <button
            onClick={next}
             className="w-full px-4 py-3 bg-blue-600 rounded-lg text-white font-medium text-lg">Continue</button>
            <span
            onClick={()=>navigate("/signin")}
             className="text-gray-700 text-center">Cancel</span>
         </div>
        
           </div>
    </div>
 )
}
export default Verification;