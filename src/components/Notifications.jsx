import { BellIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, useAnimate } from "framer-motion";
import BackArrow from "./Backarrow";
import {useNavigate} from "react-router-dom"

function Notifications() {
  const navigate=useNavigate();
  const [notifications, setNotifications] = useState([
    {
      title: "Congratulations!!,first deposit💰",
      description:
        "We've securely received your first deposit.Your balance has been updated and is ready for use.",
      time: "",
    },
    {
      title: "Only GHC100 for Bank Transfers!🎉",
      description:
        "Top up directly from your bank account using the Bank Transfer Feature.Fees:2% capped at GHC100!!",
      time: "",
    },
    {
      title:"You made a handsome deposit of GHC500",
      description:"We would setup your investor profile and would be active in 3 days time.",
      time:"",
    },
     {
      title: "Enable 2FA,💰",
      description:
        "You have to enable 2FA so we keep your account safe and secure.",
      time: "",
    },
    {
      title: "Only GHC100 for Bank Transfers!🎉",
      description:
        "Top up directly from your bank account using the Bank Transfer Feature.Fees:2% capped at GHC100!!",
      time: "",
    },
    {
      title:"You made a handsome deposit of GHC500",
      description:"We would setup your investor profile and would be active in 3 days time.",
      time:"",
    }
  ]);
  return (
    <div>
      <div className="">
        {notifications.length === 0 ? (
          <>
            <div className="flex flex-col items-center gap-4 justify-center h-screen">
              <motion.div
                animate={{ rotate: [0, 12, -12, 8, -8, 4, -4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="py-2 px-2 bg-gray-200 rounded-full "
              >
                <BellIcon className="text-gray-800 w-12 h-12 rotate-40" />
              </motion.div>
              <p className="font-medium text-black text-md">
                No notifications yet
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className=" flex p-3 justify-between items-center">
                <div onClick={() => navigate("/dashboard")}>
                  <BackArrow />
                </div>
                <h2 className="text-xl font-medium">Notifications</h2>
                <div></div>
              </div>

              <div className="mt-5 w-full flex flex-col bg-gray-00 gap-6">
                {notifications.map((item) => (
                  <div
                    kay={crypto.randomUUID()}
                    className="relative w-full border-b-1 border-gray-300 pb-10 p-3 flex gap-5"
                  >
                    <div className="py-1 px-1 bg-gray-100 h-13 w-13 inline-flex rounded-full flex justify-center items-center">
                      <BellIcon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="font-medium text-[13px]">{item.title}</p>
                      <span className="text-sm">{item.description}</span>
                      <span className="text-gray-700 absolute bottom-4 right-8 text-sm  ">
                        Jan 5,2026 at 5:20pm
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Notifications;
