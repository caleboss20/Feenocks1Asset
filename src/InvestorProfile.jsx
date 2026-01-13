import { useNavigate } from "react-router-dom";
import BackArrow from "./components/Backarrow";
import { useState } from "react";
import { motion } from "framer-motion";
function InvestorProfile() {
  const navigate = useNavigate();
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
  const currentYear = new Date().getFullYear();
  // Country-based phone validation
  const isPhoneValid = (phone, country) => {
    const digitsOnly = phone.replace(/\D/g, "");
    if (country === "GH") {
      if (digitsOnly.startsWith("0")) {
        // 0XXXXXXXXX → 10 digits
        return digitsOnly.length === 10;
      } else if (digitsOnly.startsWith("233")) {
        // 233XXXXXXXXX → 12 digits, first digit after 233 cannot be 0
        return digitsOnly.length === 12 && digitsOnly[3] !== "0";
      } else if (digitsOnly.startsWith("233")) {
        return false;
      } else if (digitsOnly.startsWith("233")) return false;
      else if (digitsOnly.startsWith("233") || digitsOnly.startsWith("+233")) {
        return digitsOnly.length === 12 && digitsOnly[3] !== "0";
      } else return false;
    }
    // Example Nigeria
    if (country === "NG") {
      if (digitsOnly.startsWith("0")) return digitsOnly.length === 11;
      if (digitsOnly.startsWith("234")) return digitsOnly.length === 13 && digitsOnly[3] !== "0";
      return false;
    }
    return false; // others not implemented yet
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
    // DOB validation
    if (!form.dobDay || !form.dobMonth || !form.dobYear) {
      setDobError("Please complete date of birth (day, month, year).");
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
    // Start button loading
    setLoading(true);
    // After 2 seconds show blur overlay for 5 seconds
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
        <div className="absolute inset-0 bg-white/70 backdrop-blur-md flex justify-center items-center z-50">
          <p className="text-2xl font-medium text-gray-800">Checking your info...</p>
        </div>
      )}
      <div onClick={() => navigate("/terms")}>
        <BackArrow />
      </div>
      <h2 className="text-2xl font-medium mt-5">Personal information</h2>
      <form className="mt-6">
        {/* Marital Status */}
        <motion.div animate={touched && !form.maritalStatus ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && !form.maritalStatus ? "text-red-500" : ""}`}>
            Marital Status
          </label>
          <select
            value={form.maritalStatus}
            onChange={(e) => setForm({ ...form, maritalStatus: e.target.value })}
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.maritalStatus ? "border-red-500" : form.maritalStatus ? "border-green-600" : "border-gray-600"
            }`}
          >
            <option value="" disabled>
              Marital status
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="preferNot">Prefer not to say</option>
          </select>
          {touched && !form.maritalStatus && <p className="text-red-500 text-sm mt-1">Please select your marital status</p>}
        </motion.div>
        {/* Residential Status */}
        <motion.div animate={touched && !form.residentialStatus ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && !form.residentialStatus ? "text-red-500" : ""}`}>
            Residential status
          </label>
          <select
            value={form.residentialStatus}
            onChange={(e) => setForm({ ...form, residentialStatus: e.target.value })}
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.residentialStatus ? "border-red-500" : form.residentialStatus ? "border-green-700" : "border-gray-600"
            }`}
          >
            <option value="" disabled>
              Residential status
            </option>
            <option value="homeowner">Homeowner</option>
            <option value="renting">Renting</option>
            <option value="family">Living with Family</option>
            <option value="other">Other</option>
          </select>
          {touched && !form.residentialStatus && <p className="text-red-500 text-sm mt-1">Please select your residential status</p>}
        </motion.div>
        {/* Occupation */}
        <motion.div animate={touched && !form.occupation ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && !form.occupation ? "text-red-500" : ""}`}>
            Occupation
          </label>
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
        <h2 className="text-2xl font-medium mt-8 mb-5">Next Of kin</h2>
        {/* Full Name */}
        <motion.div animate={touched && (!form.firstName || !form.otherNames) ? shake : {}}>
          <label className={`text-gray-800 text-md ${touched && (!form.firstName || !form.otherNames) ? "text-red-500" : ""}`}>
            Full name
          </label>
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
        {/* Date of Birth */}
        <motion.div animate={touched && (!form.dobDay || !form.dobMonth || !form.dobYear) ? shake : {}}>
          <label className="text-gray-800 text-md">Date of birth</label>
          <div className="flex gap-3 mt-2 mb-5">
            {/* Day */}
            <select
              value={form.dobDay || ""}
              onChange={(e) => setForm({ ...form, dobDay: e.target.value })}
              className="py-4 px-3 w-1/3 rounded-lg border-1 border-gray-600"
            >
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}
                </option>
              ))}
            </select>
            {/* Month */}
            <select
              value={form.dobMonth || ""}
              onChange={(e) => setForm({ ...form, dobMonth: e.target.value })}
              className="py-4 px-3 w-1/3 rounded-lg border-1 border-gray-600"
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}
                </option>
              ))}
            </select>
            {/* Year */}
            <select
              value={form.dobYear || ""}
              onChange={(e) => setForm({ ...form, dobYear: e.target.value })}
              className="py-4 px-3 w-1/3 rounded-lg border-1 border-gray-600"
            >
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
        {/* Country Selector */}
        <motion.div animate={touched && !form.country ? shake : {}}>
          <label className="text-gray-800 text-md">Country</label>
          <select
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            className={`mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.country ? "border-red-500" : form.country ? "border-green-600" : "border-gray-600"
            }`}
          >
            <option value="GH">🇬🇭 Ghana</option>
            <option value="NG">🇳🇬 Nigeria</option>
            <option value="BJ">🇧🇯 Benin</option>
            <option value="CG">🇨🇬 Congo</option>
          </select>
        </motion.div>
        {/* Phone */}
        <motion.div animate={touched && (!form.phone || !isPhoneValid(form.phone, form.country)) ? shake : {}}>
          <label
            className={`text-gray-800 text-md ${
              touched && (!form.phone || !isPhoneValid(form.phone, form.country))
                ? "text-red-500"
                : touched && form.phone && isPhoneValid(form.phone, form.country)
                ? "text-green-500"
                : ""
            }`}
          >
            Phone number
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              loading
                ? "cursor-not-allowed"
                : touched && (!form.phone || !isPhoneValid(form.phone, form.country))
                ? "border-red-500"
                : touched && form.phone && isPhoneValid(form.phone, form.country)
                ? "border-green-700"
                : "border-gray-700"
            }`}
            disabled={loading}
          />
          {touched && !form.phone && <p className="text-red-500 text-md mt-3">Phone number is required</p>}
          {touched && form.phone && !isPhoneValid(form.phone, form.country) && <p className="text-red-500 text-md mt-3">Invalid phone number for selected country</p>}
        </motion.div>
        <button
          onClick={handleNext}
          disabled={loading}
          className={`text-lg font-medium py-3 px-4 w-full mt-10 rounded-lg flex items-center justify-center ${
            loading ? "bg-gray-200 cursor-not-allowed text-white" : "bg-[#0b3c39] text-white"
          }`}
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