import { useNavigate } from "react-router-dom";
import BackArrow from "./components/Backarrow";
import { useState } from "react";
import { motion } from "framer-motion";


import usa from "./assets/flags/usa.png";
import ghana from "./assets/flags/ghana.png";
import nigeria from "./assets/flags/nigeria.png";
import benin from "./assets/flags/benin.png";
import congo from "./assets/flags/congo.png";
import germany from "./assets/flags/germany.png";


  function InvestorProfile() {

  const navigate = useNavigate();
  const countries = [
    { code: "GH", name: "Ghana", flag: ghana },
    { code: "NG", name: "Nigeria", flag: nigeria },
    { code: "BJ", name: "Benin", flag: benin },
    { code: "CG", name: "Congo", flag: congo },
    { code: "USA", name: "USA", flag: usa },
     { code: "ger", name: "Germany", flag: germany },
  ];
  const [form, setForm] = useState({
    maritalStatus: "",
    residentialStatus: "",
    occupation: "",
    firstName: "",
    otherNames: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    country: "GH",
    phone: "",
  });
  const [touched, setTouched] = useState(false);
  const [dobError, setDobError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  // Country-based phone validation
  
  const isPhoneValid = (phone, country) => {
    const digitsOnly = phone.replace(/\D/g, "");
    if (country === "GH") {
      if (digitsOnly.startsWith("0")) return digitsOnly.length === 10;
      if (digitsOnly.startsWith("233") || digitsOnly.startsWith("+233")) {
        return digitsOnly.length === 12 && digitsOnly[3] !== "0";
      }
      return false;
    }
    if (country === "NG") {
      if (digitsOnly.startsWith("0")) return digitsOnly.length === 11;
      if (digitsOnly.startsWith("234") || digitsOnly.startsWith("+234")) {
        return digitsOnly.length === 13 && digitsOnly[3] !== "0";
      }
      return false;
    }
    return false; // Others not implemented yet
  };

  const calculateAge = (day, month, year) => {
    if (!day || !month || !year) return null;
    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };
  const handleNext = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!form.dobDay || !form.dobMonth || !form.dobYear) {
      setDobError("Please complete your date of birth (day, month, year).");
      return;
    } else setDobError("");
    const age = calculateAge(form.dobDay, form.dobMonth, form.dobYear);
    if (age < 18) {
      setAgeError("You must be at least 18 years old to register.");
      return;
    } else setAgeError("");
    const allFilled =
      form.maritalStatus &&
      form.residentialStatus &&
      form.occupation &&
      form.firstName &&
      form.otherNames &&
      form.dobDay &&
      form.dobMonth &&
      form.dobYear &&
      form.phone &&
      isPhoneValid(form.phone, form.country);
    if (!allFilled) return;
    setLoading(true);
    setTimeout(() => {
      setOverlay(true);
      setTimeout(() => {
        setOverlay(false);
        setLoading(false);
        navigate("/deposit");
      }, 5000);
    }, 2000);
  };
  const shake = { x: [0, -10, 10, -10, 10, 0], transition: { duration: 0.4 } };
  return (
    <div className="p-6 relative">
      {overlay && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-md flex justify-center items-center z-50 w-screen h-screen flex justify-center items-center">
          <p className="text-lg font-medium text-gray-800">Checking your info...</p>
        </div>
      )}
      <div onClick={() => navigate("/terms")}>
        <BackArrow />
      </div>
      <h2 className="text-2xl font-medium mt-5">Personal information</h2>
      <form className="mt-6">
        {/* Marital Status */}
        <motion.div animate={touched && !form.maritalStatus ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && !form.maritalStatus ? "text-red-500" : ""}`}>Marital Status</label>
          <select
            value={form.maritalStatus}
            onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.maritalStatus ? "border-red-500" : form.maritalStatus ? "border-green-600" : "border-gray-600"
            }`}
          >
            <option value="" disabled>Marital status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="preferNot">Prefer not to say</option>
          </select>
          {touched && !form.maritalStatus && <p className="text-red-500 text-sm mt-1">Please select your marital status</p>}
        </motion.div>
        {/* Residential Status */}
        <motion.div animate={touched && !form.residentialStatus ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && !form.residentialStatus ? "text-red-500" : ""}`}>Residential status</label>
          <select
            value={form.residentialStatus}
            onChange={(e) => setForm({ ...form, residentialStatus: e.target.value })}
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.residentialStatus ? "border-red-500" : form.residentialStatus ? "border-green-700" : "border-gray-600"
            }`}
          >
            <option value="" disabled>Residential status</option>
            <option value="homeowner">Homeowner</option>
            <option value="renting">Renting</option>
            <option value="family">Living with Family</option>
            <option value="other">Other</option>
          </select>
          {touched && !form.residentialStatus && <p className="text-red-500 text-sm mt-1">Please select your residential status</p>}
        </motion.div>
        {/* Occupation */}
        <motion.div animate={touched && !form.occupation ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && !form.occupation ? "text-red-500" : ""}`}>Occupation</label>
          <input
            type="text"
            placeholder="e.g. Entrepreneur"
            value={form.occupation}
            onChange={(e) => setForm({ ...form, occupation: e.target.value })}
            className={`mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.occupation ? "border-red-500" : form.occupation ? "border-green-600" : "border-gray-600"
            }`}
          />
          {touched && !form.occupation && <p className="text-red-500 text-sm mt-1">Occupation is required</p>}
        </motion.div>
        {/* Next of Kin */}
        <h2 className="text-2xl font-medium mt-8 mb-5">Next Of kin</h2>
        <motion.div animate={touched && (!form.firstName || !form.otherNames) ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && (!form.firstName || !form.otherNames) ? "text-red-500" : ""}`}>Full name</label>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
                touched && !form.firstName ? "border-red-500" : form.firstName ? "border-green-600" : "border-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Other names"
              value={form.otherNames}
              onChange={(e) => setForm({ ...form, otherNames: e.target.value })}
              className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
                touched && !form.otherNames ? "border-red-500" : form.otherNames ? "border-green-600" : "border-gray-600"
              }`}
            />
          </div>
          {touched && (!form.firstName || !form.otherNames) && <p className="text-red-500 text-sm mt-1">Please enter full name</p>}
        </motion.div>
        {/* DOB */}
        <motion.div animate={touched && (!form.dobDay || !form.dobMonth || !form.dobYear) ? shake : {}}>
          <label className="text-gray-800 text-md">Date of birth</label>
          <div className="flex gap-3 mt-2 mb-5">
            {/* Day */}
            <select value={form.dobDay || ""} onChange={(e) => setForm({ ...form, dobDay: e.target.value })} className="py-4 px-3  w-1/3 rounded-lg border-1 border-gray-600">
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>{i + 1}</option>
              ))}
            </select>
            {/* Month */}
            <select value={form.dobMonth || ""} onChange={(e) => setForm({ ...form, dobMonth: e.target.value })} className="py-4 px-3 w-1/3 rounded-lg border-1 border-gray-600">
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>{i + 1}</option>
              ))}
            </select>
            {/* Year */}
            <select value={form.dobYear || ""} onChange={(e) => setForm({ ...form, dobYear: e.target.value })} className="py-4 px-3 w-1/3 rounded-lg border-1 border-gray-600">
              <option value="">Year</option>
              {(() => {
                const startYear = currentYear - 18;
                const endYear = currentYear - 60;
                const years = [];
                for (let y = startYear; y >= endYear; y--) years.push(<option key={y} value={y}>{y}</option>);
                return years;
              })()}
            </select>
          </div>
          {touched && (!form.dobDay || !form.dobMonth || !form.dobYear) && <p className="text-red-500 text-sm mt-1">Please complete your date of birth</p>}
          {ageError && <p className="text-red-500 text-sm mt-1">{ageError}</p>}
        </motion.div>
       
       {/* Custom Country Selector */}
<motion.div animate={touched && !form.country ? shake : {}} className="relative mt-5">
  <label className="text-gray-800 text-md">Country</label>
  {/* Selected country box */}
  <div
    onClick={() => setDropdownOpen(!dropdownOpen)}
    className="mt-2 py-4 px-3 w-full rounded-lg border-1 border-gray-600 cursor-pointer flex justify-between items-center"
  >
    <div className="flex items-center gap-2">
      {/* Show flag */}
      <img
        className="w-8 h-8 rounded"
        src={countries.find((c) => c.code === form.country)?.flag}
        alt={form.country}
      />
      {/* Show name */}
      <span>{countries.find((c) => c.code === form.country)?.name || "Select Country"}</span>
    </div>
    <span className="text-gray-500">{dropdownOpen ? "▲" : "▼"}</span>
  </div>
  {/* Dropdown list */}
  {dropdownOpen && (
    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
      {countries.map((c) => (
        <div
          key={c.code}
          onClick={() => {
            setForm({ ...form, country: c.code }); // store code, not name
            setDropdownOpen(false);
          }}
          className="py-3 px-4 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          <img className="w-8 h-8 rounded" src={c.flag} alt={c.name} />
          <span>{c.name}</span>
        </div>
      ))}
    </div>
  )}
</motion.div>
        {/* Phone */}
        <motion.div animate={touched && (!form.phone || !isPhoneValid(form.phone, form.country)) ? shake : {}} className="mt-5">
          <label className={`text-gray-800 text-md ${touched && (!form.phone || !isPhoneValid(form.phone, form.country)) ? "text-red-500" : ""}`}>Phone number</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            disabled={loading}
            className={`mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              loading ? " cursor-not-allowed" : touched && (!form.phone || !isPhoneValid(form.phone, form.country)) ? "border-red-500" : form.phone && isPhoneValid(form.phone, form.country) ? "border-green-700" : "border-gray-600"
            }`}
          />
          {touched && !form.phone && <p className="text-red-500 text-md mt-3">Phone number is required</p>}
          {touched && form.phone && !isPhoneValid(form.phone, form.country) && <p className="text-red-500 text-md mt-3">Invalid phone number for selected country</p>}
        </motion.div>
        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={loading}
          className={`text-lg font-medium py-3 px-4 w-full mt-10 rounded-lg flex items-center justify-center ${loading ? "bg-gray-200 cursor-not-allowed text-white" : "bg-[#0b3c39] text-white"}`}
        >
          {loading && (
            <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          )}
          Next
        </button>
      </form>
    </div>
  );
}
export default InvestorProfile;