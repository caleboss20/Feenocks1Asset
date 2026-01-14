// ============= APP.JSX =============
import Navbar from "./components/Navbar";
import "./index.css";
import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./SignIn";
import Verification from "./Verificationstep1";
import Verification2 from "./Verificationstep2";
import Verification3 from "./Verification3";
import Verification4 from "./Verification4";
import CompleteVerification from "./CompleteVerification";
import { useEffect, useState } from "react";
import RiskAssessment from "./RiskAssessment";
import RiskAssessmentResults from "./RiskAssessmentResults";
import DepositSection from "./DepositSection";
import SocialInfo from "./Socialinfo";
import Recommendation from "./Recommendation";
import SupportCenter from "./Support";
import InvestorProfile from "./InvestorProfile";
import TermsAndConditions from "./TermsAndConditions";
import PrivacyPolicy from "./PrivacyPolicy";
import Dashboard from "./Dashboard";
import DepositAmount from "./DepositFlow/DepositAmount";
import DepositMethod from "./DepositFlow/DepositMethod";
import DepositConfirm from "./DepositFlow/Depositconfirm";
import Transactions from "./Transactions";
import WithDrawalMethod from "./withdrawflow/withdrawalmethod";
import WithdrawPage from "./withdrawflow/withdrawpage";
import Ottpverification from "./withdrawflow/Ottpverify";
import PrivacyPolicyAny from "./PrivacyPolicyany";
import TermsAndConditionsAny from "./TermsAndConditionsAny";
import PINSetupPage from "./components/PinSetUp";
import Referral from "./components/Referral";
import PredictionAmount from "./components/PredictionAmount";
import PasswordReset from "./components/PasswordReset";
import WelcomePage from "./components/WelcomePage";
import Splashscreen from "./components/Splashscreen";
import Packages from "./DepositFlow/Packages";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState({});
  const [riskResult, setRiskResult] = useState(null);
  // ===== WALLET SECTION =====
  const [walletName, setWalletName] = useState("");
   const [profileName, setProfileName] = useState(() => {
    const saved = localStorage.getItem("profileName");
    return saved ? String(saved) : "";
  })

  // ===== DEPOSIT SECTION =====
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  // ===== BALANCE TRACKING - FIXED =====
  const [totalFunded, setTotalFunded] = useState(() => {
    const saved = localStorage.getItem("totalFunded");
    return saved ? Number(saved) : 0;
  });
  const [totalWithdrawn, setTotalWithdrawn] = useState(() => {
    const saved = localStorage.getItem("totalWithdrawn");
    return saved ? Number(saved) : 0;
  });
  const [totalEarned, setTotalEarned] = useState(() => {
    const saved = localStorage.getItem("totalEarned");
    return saved ? Number(saved) : 0;
  });
  // ===== TRANSACTIONS =====
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });




  // ===== WITHDRAWAL STATE =====
  const [withdrawsuccess, setwithdrawSuccess] = useState(false);
  const [amount, setAmount] = useState(() => {
    const save = localStorage.getItem("withdrawAmount");
    return save ? Number(save) : 0;
  });

  const [confirmedWithdrawAmount,setConfirmedWithdrawAmount]=useState(0);










 // ===== PERSIST profile Name of user =====
  useEffect(() => {
    localStorage.setItem("profileName", profileName);
  }, [profileName]);


  // ===== PERSIST TOTAL FUNDED TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem("totalFunded", totalFunded);
  }, [totalFunded]);
  // ===== PERSIST TOTAL WITHDRAWN TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem("totalWithdrawn", totalWithdrawn);
  }, [totalWithdrawn]);
  // ===== PERSIST TOTAL EARNED TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem("totalEarned", totalEarned);
  }, [totalEarned]);
  // ===== PERSIST TRANSACTIONS TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  // ===== PERSIST WITHDRAW AMOUNT TO LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem("withdrawAmount", amount);
  }, [amount]);
  // ===== ADD DEPOSIT TRANSACTION - FIXED =====
  const AddTransaction = () => {
    // Validation
    if (!inputAmount || Number(inputAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (Number(inputAmount) < 100) {
      alert("Minimum deposit amount is GH₵ 100.00");
      return;
    }
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const time = today.toLocaleDateString("en-US", options);
    const percent = Math.random() * 10;
    const valuepercent = `${percent.toFixed(2)}%`;
    const depositAmount = Number(inputAmount);
    const newTransaction = {
      id: Date.now(),
      type: selected || "Deposit",
      amount: depositAmount,
      date: time,
      valuepercent: valuepercent,
      status: "completed"
    };
    // Add to transactions
    setTransactions(prev => [newTransaction, ...prev]);
    // ✅ FIX: Add deposit amount to totalFunded (NOT totalFunded to itself)
    setTotalFunded(prev => prev + depositAmount);
    // Clear input
    setInputAmount("");
    console.log("Deposit added successfully - Amount:", depositAmount);
  };
  // ===== WITHDRAW TRANSACTION - FIXED =====
  const completeWithdrawal = (withdrawAmount) => {
    const amount = Number(withdrawAmount);
    const totalBalance = totalFunded + totalEarned - totalWithdrawn;
    // Validation checks
    if (amount <= 0) {
      alert("Withdrawal amount must be greater than 0");
      return false;
    }
    if (amount > totalBalance) {
      alert(
        `Insufficient funds. Your available balance is GH₵ ${totalBalance.toLocaleString()}.00`
      );
      return false;
    }
    if (amount < 50) {
      alert("Minimum withdrawal amount is GH₵ 50.00");
      return false;
    }
    // Add to totalWithdrawn
    setTotalWithdrawn(prev => prev + amount);
    // Add to transactions
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const time = today.toLocaleDateString("en-US", options);
    const withdrawalTransaction = {
      id: Date.now(),
      type: "Withdrawal",
      amount: amount,
      date: time,
      valuepercent: "0%",
      status: "completed"
    };
    setTransactions(prev => [withdrawalTransaction, ...prev]);
    return true;
  };
  return (
    <>
      <div className="w-full bg-white ">
        <div className="hidden md:flex flex-col justify-center items-center h-screen w-full">
       {/* <img src={male} className="w-60 h-60" alt="" /> */}
        <h2 className="text-2xl">Desktop version will be launching soon.stay tuned🚀</h2>
        
      </div>
        <div className="md:hidden">
        <Routes>
          <Route path="/" element={<Splashscreen />} />
           <Route path="/welcomepage" element={<WelcomePage />} />
          <Route path="/support" element={<SupportCenter />} />
          <Route path="" element={<Navbar />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/passwordreset" element={<PasswordReset />} />

          <Route path="/prediction" element={<PredictionAmount />} />
          <Route path="/socialinfo" element={<SocialInfo />} />
          <Route path="/verification" element={<Verification />} />
          <Route
            path="/verification2"
            element={
              <Verification2
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            }
          />
          <Route path="/verification3" element={<Verification3 />} />
          <Route path="/verification4" element={<Verification4 />} />
          <Route
            path="/completeverify"
            element={
              <CompleteVerification
                selectedId={selectedId}
                setSelectedId={setSelectedId}
              />
            }
          />
          <Route
            path="/assessment"
            element={
              <RiskAssessment
                answers={answers}
                setAnswers={setAnswers}
                setRiskResult={setRiskResult}
              />
            }
          />
          <Route
            path="/results"
            element={
              <RiskAssessmentResults
                riskResult={riskResult}
                selectedId={selectedId}
              />
            }
          />
          <Route
            path="/recommendation"
            element={
              <Recommendation selected={selected} setSelected={setSelected} />
            }
          />
          <Route
            path="/deposit"
            element={
              <DepositSection
                walletName={walletName}
                setWalletName={setWalletName}
                profileName={profileName}
                setProfileName={setProfileName}
              />
            }
          />
          <Route path="/profile" element={<InvestorProfile />} />
          <Route path="/terms" element={<TermsAndConditions />} />
           <Route path="/termsdraft" element={<TermsAndConditionsAny />} />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/policydraft" element={<PrivacyPolicyAny />} />
           <Route path="/setpin" element={<PINSetupPage profileName={profileName}/>} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                profileName={profileName}
                inputAmount={inputAmount}
                totalFunded={totalFunded}
                totalEarned={totalEarned}
                totalWithdrawn={totalWithdrawn}
                transactions={transactions}
                selected={selected}
                withdrawsuccess={withdrawsuccess}
                setwithdrawSuccess={setwithdrawSuccess}
                selectedMethod={selectedMethod}
                withdrawAmount={amount}
                setWithdrawAmount={setAmount}
                completeWithdrawal={completeWithdrawal}
              confirmedWithdrawAmount={confirmedWithdrawAmount}
              />
            }
          />
           <Route path="/packages" element={<Packages />} />
          <Route
            path="/depositmethod"
            element={
              <DepositMethod
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            }
          />
          <Route
            path="/depositamount"
            element={
              <DepositAmount
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
                walletName={walletName}
                inputAmount={inputAmount}
                setInputAmount={setInputAmount}
              />
            }
          />
          <Route
            path="/depositconfirm"
            element={
              <DepositConfirm
                inputAmount={inputAmount}
                AddTransaction={AddTransaction}
                setTransactions={setTransactions}
                transactions={transactions}
              />
            }
          />
          <Route path="/transactions" element={<Transactions
            transactions={transactions}
          />} />
          <Route
            path="/withdrawmethod"
            element={
              <WithDrawalMethod
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />
            }
          />
          <Route
            path="/withdrawpage"
            element={
              <WithdrawPage
                selectedMethod={selectedMethod}
                totalFunded={totalFunded}
                totalEarned={totalEarned}
                totalWithdrawn={totalWithdrawn}
                withdrawAmount={amount}
                setWithdrawAmount={setAmount}
                withdrawsuccess={withdrawsuccess}
                setwithdrawSuccess={setwithdrawSuccess}
                completeWithdrawal={completeWithdrawal}
                confirmedWithdrawAmount={confirmedWithdrawAmount}
                setConfirmedWithdrawAmount={setConfirmedWithdrawAmount}
                />
            }
          />
           <Route path="/referral" element={<Referral   profileName={profileName}/>} />

        </Routes>
      </div>
      </div>
    </>
  );
}
export default App;
