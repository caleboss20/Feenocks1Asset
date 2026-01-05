import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import BackArrow from "./components/Backarrow";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
function Transactions({ transactions }) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const scrollContainerRef = useRef(null);
  // ===== CLEAN & VALIDATE TRANSACTIONS =====
  const validTransactions = transactions.filter((transaction) => {
    // Filter out transactions with NaN or invalid amounts
    if (!transaction.amount || isNaN(transaction.amount) || transaction.amount <= 0) {
      return false;
    }
    return true;
  });
  // ===== FILTER TRANSACTIONS =====
  const filteredTransactions =
    selectedFilter === "all"
      ? validTransactions
      : selectedFilter === "deposits"
      ? validTransactions.filter(
          (t) =>
            t.type !== "Withdrawal" &&
            t.type !== "withdrawal"
        )
      : selectedFilter === "withdrawals"
      ? validTransactions.filter(
          (t) =>
            t.type === "Withdrawal" ||
            t.type === "withdrawal"
        )
      : validTransactions;
  // ===== ANIMATION VARIANTS =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };
  const filterVariants = {
    inactive: {
      backgroundColor: "rgb(255, 255, 255)",
      color: "rgb(107, 114, 128)",
      borderColor: "rgb(209, 213, 219)"
    },
    active: {
      backgroundColor: "rgb(37, 99, 235)",
      color: "rgb(255, 255, 255)",
      borderColor: "rgb(37, 99, 235)"
    },
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 flex gap-10 items-center bg-white "
      >
        <div className="flex items-center justify-center mt-3">
         <Link to="/dashboard">
          <BackArrow />
        </Link>
        </div>
       
        <h2 className="font-medium text-lg text-gray-800">Transaction History</h2>
      </motion.div>
      {/* Filter Buttons - Horizontal Scrollable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className=" px-6 py-4"
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {[
            { id: "all", label: "All Transactions" },
            { id: "deposits", label: "Deposits" },
            { id: "withdrawals", label: "Withdrawals" },
          ].map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              variants={filterVariants}
              animate={selectedFilter === filter.id ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="py-2.5 px-6 border- rounded-full outline-none font-medium text-sm transition-all whitespace-nowrap flex-shrink-0"
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
      {/* Transactions List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col mt-6 w-full gap-3 p-6"
      >
        {filteredTransactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-12 rounded-lg bg-white flex flex-col items-center justify-center border-1 border-gray-200"
          >
            <div className="text-gray-400 text-4xl mb-3">📭</div>
            <span className="text-gray-500 font-medium">
              {selectedFilter === "all"
                ? "No transactions yet"
                : selectedFilter === "deposits"
                ? "No deposits found"
                : "No withdrawals found"}
            </span>
            <p className="text-gray-400 text-sm mt-2">
              {selectedFilter === "all"
                ? "Start by making a deposit"
                : selectedFilter === "deposits"
                ? "Make a deposit to get started"
                : "No withdrawals yet"}
            </p>
          </motion.div>
        ) : (
          filteredTransactions.map((transaction) => {
            // ===== DETERMINE IF DEPOSIT OR WITHDRAWAL =====
            const isWithdrawal =
              transaction.type === "Withdrawal" ||
              transaction.type === "withdrawal";
            // ===== SET COLORS AND ICONS =====
            const bgColor = isWithdrawal ? "bg-red-100" : "bg-green-100";
            const iconColor = isWithdrawal ? "text-red-700" : "text-green-700";
            const amountColor = isWithdrawal ? "text-red-600" : "text-green-600";
            const percentColor = isWithdrawal ? "text-red-400" : "text-green-400";
            const amountSign = isWithdrawal ? "- " : "+ ";
            const icon = isWithdrawal ? (
              <FiArrowDownRight className="w-6 h-6" />
            ) : (
              <FiArrowUpRight className="w-6 h-6" />
            );
            return (
              <motion.div
                key={transaction.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  backgroundColor: isWithdrawal ? "rgb(254, 242, 242)" : "rgb(240, 253, 244)"
                }}
                whileTap={{ scale: 0.98 }}
                className="flex w-full py-4 px-4 bg-white rounded-lg justify-between items-center border-1 border-gray-100 transition-all cursor-pointer"
              >
                {/* Left Section */}
                <div className="flex gap-4 flex-1">
                  {/* Icon Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`w-12 h-12 rounded-full ${bgColor} flex justify-center items-center flex-shrink-0`}
                  >
                    <div className={`${iconColor}`}>
                      {icon}
                    </div>
                  </motion.div>
                  {/* Transaction Info */}
                  <div className="flex flex-col gap-1 justify-center">
                    <h2 className="font-semibold text-sm text-gray-800">
                      {transaction.type}
                    </h2>
                    <span className="text-xs text-gray-500">
                      {transaction.date}
                    </span>
                  </div>
                </div>
                {/* Right Section */}
                <div className="flex flex-col items-end gap-1">
                  {/* Amount - Safely Display */}
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className={`text-sm font-bold ${amountColor}`}
                  >
                    {`${amountSign}GH₵ ${Math.abs(Number(transaction.amount)).toLocaleString()}.00`}
                  </motion.h2>
                  {/* Percentage/Status */}
                  {transaction.valuepercent && !isWithdrawal && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className={`text-xs font-medium ${percentColor}`}
                    >
                      {transaction.valuepercent}
                    </motion.span>
                  )}
                  {/* Withdrawal Status */}
                  {isWithdrawal && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs text-red-500 font-medium"
                    >
                      Pending
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>
      {/* Transaction Count */}
      {filteredTransactions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center py-8 px-6 text-gray-500 text-sm"
        >
          Showing {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
        </motion.div>
      )}
      {/* Custom Scrollbar Hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
export default Transactions;