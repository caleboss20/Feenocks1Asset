import { BoltIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { MdVerifiedUser } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { RiIdCardLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";

function Verification() {
  const navigate = useNavigate();
  const next = () => {
    navigate("/verification2");
  };
  return (
    <div className="w-full bg-re-400 px-8 py-4">
      {/* <Navbar /> */}
      <div className=" mt-6">
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex justify-center items-center w-25 h-25  bg-[#e6f2ef] rounded-full mb-3">
            <RiIdCardLine className="w-13 h-13 text-[#0b3c39]" />
          </div>
          <p className="text-xl text-gray-800 font-medium text-center">
            To continue,we need to verify your identity
          </p>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-10"></div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 mt-10">
            <div className="h-14 w-14  rounded-full  bg-[#e6f2ef] flex justify-center items-center ">
              <BoltIcon className="w-6 h-6 text-[#0b3c39]" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h2 className="text-black font-medium text-lg">
                Fast and secure
              </h2>
              <p className="text-gray-700 text-sm">
                This only takes a couple of minutes and is protected with
                encryption
              </p>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            <div className="h-14 w-14  rounded-full  bg-[#e6f2ef] flex justify-center items-center ">
              <LockClosedIcon className="w-6 h-6 text-[#0b3c39]" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h2 className="text-black font-medium text-lg">
                Data used to verify you
              </h2>
              <p className="text-gray-700 text-sm">
                Information yoy provide,data about your device and your behavior
              </p>
            </div>
          </div>
        </div>

        <div className="mt-15 flex flex-col gap-4 w-full h-45 bg-viole-300 p-6">
          <p className=" text-center text-[11px] text-gray-600">
            By selecting "continue" you agree to the{" "}
            <span className="underline">Terms</span>
          </p>
          <button
            onClick={next}
            className="w-full px-4 py-3 bg-[#0b3c39] rounded-lg text-white font-medium text-md"
          >
            Continue
          </button>
          <span
            onClick={() => navigate("/signin")}
            className="text-gray-700 text-center text-md"
          >
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
}
export default Verification;
