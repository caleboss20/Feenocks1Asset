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
import { useState } from "react";
import RiskAssessment from "./RiskAssessment";
import RiskAssessmentResults from "./RiskAssessmentResults";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div className="w-full bg-white">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="" element={<Navbar />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
        <Route path="/assessment" element={<RiskAssessment />} />
          <Route path="/results" element={<RiskAssessmentResults  selectedId={selectedId}/>} />
      </Routes>
    </div>
  );
}

export default App;
