// ============= DASHBOARD.JSX =============
import { BellIcon } from "@heroicons/react/24/outline";
import { AiOutlineEyeInvisible, AiOutlineArrowUp } from "react-icons/ai";
import { FiEye, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import photo5 from "./assets/images/photo5.png";
import { useState, useEffect } from "react";
import WithdrawSuccesss from "./withdrawflow/withdrawsuccess";
function Dashboard({
  profileName,
  totalFunded,
  totalEarned,
  totalWithdrawn,
  transactions,
  withdrawsuccess,
  setwithdrawSuccess,
  selectedMethod,
  withdrawAmount,
  setWithdrawAmount,
  completeWithdrawal,
   confirmedWithdrawAmount,
  setConfirmedWithdrawAmount,
}) {
  const [hide, setHide] = useState(false);
  const [popup, setPopup] = useState(false);
  const [shake, setShake] = useState(false);
  const [initialDepositAmount, setInitialDepositAmount] = useState("");
  const navigate = useNavigate();
  // ===== CALCULATE CORRECT TOTAL BALANCE =====
  const totalBalance = totalFunded + totalEarned - totalWithdrawn;
  const handleNext = () => {
    if (!initialDepositAmount || parseFloat(initialDepositAmount) <= 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    if (parseFloat(initialDepositAmount) < 100) {
      alert("Minimum deposit is GH₵ 100.00");
      return;
    }
    navigate("/depositmethod");
  };
  const handleShow = () => setHide(!hide);
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenDashboardPopup");
    if (!hasSeenPopup) {
      setPopup(true);
      localStorage.setItem("hasSeenDashboardPopup", "true");
    }
  }, []);
  return (
    <div className="w-full p-4">
      {/* Header */}
      <div className="w-full h-20 bg-re-500 mb-4 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-11 h-11 rounded-full bg-yellow-500">
            <img src={photo5} className="rounded-full" alt="" />
          </div>
          <div>
            <h2 className="font-medium text-lg text-gray-800">
              {`Hi, ${profileName || "there"}`}
            </h2>
            <span className="text-gray-600">Welcome!</span>
          </div>
        </div>

        <div
        onClick={()=>navigate("/referral")} 
        className="py-1 px-2 bg-[#e6f2ef] rounded-lg">
          <p className="text-gray-900 text-sm">Refer a friend</p>
        </div>

        <div className="relative">
          <BellIcon className="w-6 h-6" />
          <div className="absolute p-1 top-0 right-1 bg-red-600 rounded-full"></div>
        </div>
      </div>
      {/* Total Balance Card - FIXED */}
      <div className="p-4 rounded-md w-full bg-gradient-to-r from-[#0b3c39] via-[#0b9999] to-[#0b3d39] shadow-2xl">
        <h2 className="text-white font-small text-2xl font-light">
          Total Balance
        </h2>
        <div className="flex items-center gap-16 mt-4 justify-between">
          {hide ? (
            <p className="text-4xl text-white mt-2">********</p>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-xl text-white mt-2">
                {`GH₵ ${totalBalance.toLocaleString()}.00`}
              </p>
              <div className="relative flex items-center right-0 h-10 bg-re-600">
                <p className="text-green-400 mt-2 font-medium">2.03%</p>
                <AiOutlineArrowUp className="absolute bottom-2 -right-5 w-4 h-4 text-green-400 font-medium" />
              </div>
            </div>
          )}
          <div onClick={handleShow}>
            {hide ? (
              <FiEye className="w-6 h-6 mt-3 text-white" />
            ) : (
              <AiOutlineEyeInvisible className="w-6 h-6 mt-3 text-white" />
            )}
          </div>
        </div>
        <div className="flex gap-7 items-center justify-between mt-14">
          <p className="text-white font-medium mt-4 text-xl">
            +233 *** *** ***
          </p>
          <div className="mt-3 py-2 px-3 rounded-full text-[#e6f2ef] flex items-center bg-[#00bb3c39]">
            Account No
          </div>
        </div>
      </div>
      {/* Deposit / Withdraw Buttons */}
      <div className="flex w-full mt-10 gap-6">
        <Link
          to="/depositmethod"
          className="shadow-2xl flex-1 gap-3 flex items-center bg-[#e6f2ef] rounded-full"
        >
          <div className="rounded-sm w-5 h-5 border-1 border-[#e6f2ef] ml-4 flex items-center justify-center">
            <FiArrowUpRight className="transform text-[#0b3c39]" />
          </div>
          <p className="text-gray-800 font-small">Deposit</p>
        </Link>
        <Link
          to="/withdrawmethod"
          className="flex-1 py-3 shadow-2xl bg-[#e6f2ef] rounded-full"
        >
          <div>
            <div className="flex-1 gap-3 flex items-center rounded-full">
              <div className="rounded-sm w-5 h-5 border- border-[#0b3c39] ml-4 flex items-center justify-center">
                <FiArrowDownLeft className="transform  text-[#0b3c39]" />
              </div>
              <p className="text-gray-800 font-small">Withdraw</p>
            </div>
          </div>
        </Link>
      </div>
      {/* Summary Section - FIXED */}
      <div className="mt-10 w-full bg-re-400 p-4 flex flex-col gap-5 rounded-lg ">
        {/* Total Funded */}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium text-gray-700">Total Funded</p>
          <span className="text-gray-800 text-lg font-normal">
            {`GH₵ ${Number(totalFunded).toLocaleString()}.00`}
          </span>
        </div>
        <div className="w-full h-[1px] bg-gray-100"></div>
        {/* Total Earned */}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium text-gray-700">Total Earned</p>
          <span className="text-gray-800 text-lg font-normal">
            {`GH₵ ${Number(totalEarned).toLocaleString()}.00`}
          </span>
        </div>
        <div className="w-full h-[1px] bg-gray-100"></div>
        {/* Total Withdrawn - NOW SHOWS ACTUAL WITHDRAWN (NOT PENDING INPUT) */}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium text-gray-700">Total Withdrawn</p>
          <span className="text-gray-800 text-lg font-normal">
            {`GH₵ ${Number(totalWithdrawn).toLocaleString()}.00`}
          </span>
        </div>
      </div>
      {/* Recent Transactions */}
<div className="w-full bg-re-500 mt-14 mb-40">
  <div className="flex justify-between">
    <h2 className="font-medium text-gray-700 text-sm">
      RECENT TRANSACTIONS
    </h2>
    <Link to="/transactions">
      <span className="mr-3 text-blue-600 font-medium">See All</span>
    </Link>
  </div>
  {transactions.length === 0 ? (
    <div className="w-full mt-10 py-3 rounded-lg bg-gray-100 flex items-center justify-center">
      <span className="text-sm">No transactions to display</span>
    </div>
  ) : (
    <div className="flex flex-col mt-8 w-full gap-3">
      {transactions.map((transaction) => {
        // ===== DETERMINE IF DEPOSIT OR WITHDRAWAL =====
        const isWithdrawal =
          transaction.type === "Withdrawal" ||
          transaction.type === "withdrawal";
        // ===== SET COLORS AND ICON BASED ON TYPE =====
        const bgColor = isWithdrawal ? "bg-red-100" : "bg-green-100";
        const iconColor = isWithdrawal ? "text-red-700" : "text-green-700";
        const amountColor = isWithdrawal ? "text-red-600" : "text-green-600";
        const percentColor = isWithdrawal ? "text-red-400" : "text-green-400";
        const amountSign = isWithdrawal ? "- " : "+ ";
        const icon = isWithdrawal ? (
          <FiArrowDownLeft className="w-6 h-6" />
        ) : (
          <FiArrowUpRight className="w-6 h-6" />
        );
        return (
          <div
            key={crypto.randomUUID()}
            className="flex w-full py-4 px-3 bg-white rounded-lg justify-between items-center hover:shadow-md transition-shadow"
          >
            {/* Left Section - Icon & Details */}
            <div className="flex gap-3 flex-1">
              {/* Icon Circle */}
              <div className={`w-10 h-10 rounded-full ${bgColor} flex justify-center items-center flex-shrink-0`}>
                <div className={`${iconColor}`}>
                  {icon}
                </div>
              </div>
              {/* Transaction Info */}
              <div className="flex flex-col gap-1">
                <h2 className="font-medium text-sm text-gray-800">
                  {transaction.type}
                </h2>
                <span className="text-xs text-gray-500">
                  {transaction.date}
                </span>
              </div>
            </div>
            {/* Right Section - Amount & Percent */}
            <div className="flex flex-col items-end gap-1">
              {/* Amount */}
              <h2 className={`text-sm font-bold ${amountColor}`}>
                {`${amountSign}GH₵ ${Math.abs(transaction.amount).toLocaleString()}.00`}
              </h2>
              {/* Percentage/Status */}
              {transaction.valuepercent && (
                <span className={`text-xs font-medium ${percentColor}`}>
                  {transaction.valuepercent}
                </span>
              )}
              {/* Status Badge for Withdrawals */}
              {/* {isWithdrawal && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  Pending
                </span>
              )} */}
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>
      {/* Add Funds Button */}
      <div className="z-10 fixed w-full h-20 p-4 bottom-0 right-0">
        <button
          onClick={() => navigate("/depositmethod")}
          className="py-3 bg-[#0b3c39] text-white w-full rounded-lg font-medium border-none outline-none"
        >
          Add Funds
        </button>
      </div>
      {/* Popup - First Deposit */}
      {popup && (
        <div className="fixed top-0 bottom-0 right-0 inset-0 bg-black/50 w-full z-20"></div>
      )}
      {popup && (
        <div className="w-full pl-2 py-6 px-2 h-110 fixed bottom-0 left-0 right-0 bg-white shadow-xl z-50 rounded-xl">
          <span className="text-4xl">🥳</span>
          <p className="ml-4 mt-6 font-small text-sm leading-normal text-gray-700">
            Now that your investment account is ready, how about you make that
            first deposit? Just enter the amount to get started. It must be at
            least GH₵ 100.00
          </p>
          <div className="ml-3 mr-3">
            <input
              value={initialDepositAmount}
              onChange={(e) => setInitialDepositAmount(e.target.value)}
              type="number"
              placeholder="GH₵ 100.00"
              className={`${
                shake ? "shake border-1 border-red-500" : "border-gray-300"
              } text-xl pl-4 w-full h-18 bg-gray-100 rounded-lg mt-8`}
            />
            <style>
              {`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                50% { transform: translateX(5px); }
                75% { transform: translateX(-5px); }
              }
              .shake {
                animation: shake 0.5s ease-in-out;
              }
            `}
            </style>
            <button
              onClick={handleNext}
              className="py-3 hover:bg-blue-700 transition mt-8 bg-green-800 text-white w-full rounded-lg font-medium border-none outline-none"
            >
              Continue
            </button>
            <div
              onClick={() => setPopup(false)}
              className="flex justify-center items-center mt-8"
            >
              <span className="font-medium text-gray-900 text-md">Later</span>
            </div>
          </div>
        </div>
      )}
      {/* Withdrawal Success Modal */}
      {withdrawsuccess ? (
        <>
          <div
            onClick={() => setwithdrawSuccess(false)}
            className="fixed top-0 bottom-0 right-0 inset-0 bg-black/60 w-full z-20"
          ></div>
          <WithdrawSuccesss
            totalBalance={totalBalance}
            withdrawAmount={withdrawAmount}
            selectedMethod={selectedMethod}
            withdrawsuccess={withdrawsuccess}
            setwithdrawSuccess={setwithdrawSuccess}
            completeWithdrawal={completeWithdrawal}
             confirmedWithdrawAmount={confirmedWithdrawAmount}
 
          />
        </>
      ) : null}
    </div>
  );
}
export default Dashboard;
      