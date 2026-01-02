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

// Risk calculation utility
function calculateRiskProfile(answers) {
  // Sum of all answer values
  const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
  // Map score ranges to profiles
  if (total <= 22) return { level: "Conservative", portfolioType: "Safe" };
  if (total <= 32) return { level: "Moderate", portfolioType: "Balanced" };
  if (total <= 42) return { level: "Growth", portfolioType: "Aggressive" };
  return { level: "Aggressive", portfolioType: "High-Risk" };
}

function App() {

  const [selectedId, setSelectedId] = useState(null);
   const [selected,setSelected]=useState(null);
  const [answers, setAnswers] = useState({});
  const [riskResult, setRiskResult] = useState(null);
  //for the wallet section//
  const [walletName, setWalletName] = useState("");
  const [profileName, setProfileName] = useState("");
  //for deposit side//
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [totalAmount, setTotalAmount] =useState(()=>{
    const saved=localStorage.getItem("totalAmount");
    return saved? Number(saved):0;
  });
  //for the withdraw page//
    const [amount, setAmount] = useState("");

  //for the withdrawal success//
    const [withdrawsuccess,setwithdrawSuccess]=useState(false);


  const [transactions, setTransactions] = useState(()=>{
    const saved=localStorage.getItem("transactions");
    return saved? JSON.parse(saved):[];
  });

  useEffect(()=>{
    localStorage.setItem("transactions",
      JSON.stringify(transactions));  
  },[transactions]);

    useEffect(()=>{
    localStorage.setItem("totalAmount",
      totalAmount);  
  },[totalAmount]);

  const AddTransaction = () => {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const time = today.toLocaleDateString("en-US", options);
    const percent=Math.random()*10;
    const valuepercent=`${percent.toFixed(2)}%`;
    const newtransaction = {
      id: Date.now(),
      type: selected,
      amount: Number(inputAmount),
      date: time,
      valuepercent:valuepercent
    };
    setTransactions(prev=>[newtransaction,...prev]);
    setTotalAmount(prev=>prev+Number(inputAmount));
    console.log("added");
  };

  return (
    <>
    <div className="w-full bg-white">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/support" element={<SupportCenter />} />

        <Route path="" element={<Navbar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
        <Route path="/recommendation" element={<Recommendation 
        selected={selected}
        setSelected={setSelected}
        />} />
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
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              profileName={profileName}
              inputAmount={inputAmount}
              totalAmount={totalAmount}
              transactions={transactions}
              selected={selected}
              withdrawsuccess={withdrawsuccess}
              setwithdrawSuccess={setwithdrawSuccess}
              selectedMethod={selectedMethod}
            />
          }
        />
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
         <Route path="/withdrawpage" element={<WithdrawPage 
         selectedMethod={selectedMethod}
         totalAmount={totalAmount}
         amount={amount}
         setAmount={setAmount}
         withdrawsuccess={withdrawsuccess}
         setwithdrawSuccess={setwithdrawSuccess}

         />} />
      </Routes>
      
    </div>
    
    </>
  );
}

export default App;
