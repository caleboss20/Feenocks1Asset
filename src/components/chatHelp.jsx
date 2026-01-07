import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HandRaisedIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const HELP_DISMISSED_KEY = "help_box_dismissed";
const ScrollingNeedHelpBox = () => {
  const navigate = useNavigate();
  const [showHelpBox, setShowHelpBox] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  useEffect(() => {
    const dismissed = localStorage.getItem(HELP_DISMISSED_KEY);
    if (dismissed) return;
    const handleScroll = () => {
      if (window.scrollY > 1300) {
        setShowHelpBox(true);
        window.removeEventListener("scroll", handleScroll); // 🔥 trigger once
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleClose = () => {
    setShowHelpBox(false);
    localStorage.setItem(HELP_DISMISSED_KEY, "true");
  };
  return (
    <AnimatePresence>
      {showHelpBox && (
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ opacity: 0, y: 50, x: 200 }}
          animate={{
            opacity: 1,
            y: 0,
            x: 0,
            width: isMinimized ? 'auto' : '240px'
          }}
          exit={{ opacity: 0, y: 50, x: 400 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="relative">
            {/* Arrow Pointer */}
            <div className="absolute -top-3 left-6 w-0 h-0 border-l-6 border-r-0 border-b-6 border-l-transparent border-b-teal-600 z-10" />
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-3 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
              {!isMinimized ? (
                <>
                  {/* Close */}
                  <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5 text-white" />
                  </button>
                  <div className="flex items-start gap-3 pr-8">
                    <motion.div
                      animate={{ rotate: [0, 15, -10, 0], y: [0, -8, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex-shrink-0 mt-1"
                    >
                      <HandRaisedIcon className="w-10 h-10 text-white drop-shadow-lg" />
                    </motion.div>
                    <p className="text-white text-sm">Hi, need any help?</p>
                  </div>
                  <motion.button
                    onClick={() => navigate("/support")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full bg-white text-gray-900 font-bold py-2.5 px-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm"
                  >
                    Contact Support
                  </motion.button>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-40" />
                </>
              ) : (
                <button
                  onClick={() => setIsMinimized(false)}
                  className="flex items-center gap-2 text-white font-semibold"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <HandRaisedIcon className="w-6 h-6" />
                  </motion.div>
                </button>
              )}
              <div className="absolute inset-0 bg-teal-600 rounded-2xl blur-xl opacity-20 -z-10" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ScrollingNeedHelpBox;