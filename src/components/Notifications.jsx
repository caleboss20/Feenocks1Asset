import { BellIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  return (
    <div>
      <div className="flex flex-col h-screen w-full justify-center items-center">
        {notifications.length === 0 ? (
          <>
            <div className="flex flex-col items-center gap-4 justify-center">
              <motion.div
              animate={{rotate:[0,12,-12,8,-8,4,-4,0]}}
              transition={{
                duration:1.8,
                repeat:Infinity,
                ease:"easeInOut",
                

              }}
               className="py-2 px-2 bg-gray-200 rounded-full">
                <BellIcon className="text-gray-800 w-12 h-12 rotate-40" />
              </motion.div>
              <p className="font-medium text-black text-md">
                No notifications yet
              </p>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default Notifications;
