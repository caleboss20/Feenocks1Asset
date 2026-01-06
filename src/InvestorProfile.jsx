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
    dob: "",
    phone: "",
  });
  const [touched, setTouched] = useState(false);
  const isPhoneValid = (phone) => {
    const phoneRegex = /^\+233\s\d{3}-\d{3}-\d{3}$/;
    return phoneRegex.test(phone);
  };
  const handleNext = (e) => {
    e.preventDefault();
    setTouched(true);
    const allFilled =
      form.maritalStatus &&
      form.residentialStatus &&
      form.occupation &&
      form.firstName &&
      form.otherNames &&
      form.dob &&
      form.phone &&
      isPhoneValid(form.phone);
    if (allFilled) {
      navigate("/deposit"); // go to terms page
    }
  };
  const shake = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };
  return (
    <div className="p-6">
      <div onClick={() => navigate("/terms")}>
        <BackArrow />
      </div>
      <h2 className="text-2xl font-medium mt-5">Personal information</h2>
      <form className="mt-6">
        {/* Marital Status */}
        <motion.div animate={touched && !form.maritalStatus ? shake : {}}>
          <label
            className={`text-gray-800 text-md ${
              touched && !form.maritalStatus ? "text-red-500" : ""
            }`}
          >
            Marital Status
          </label>
          <select
            value={form.maritalStatus}
            onChange={(e) =>
              setForm({ ...form, maritalStatus: e.target.value })
            }
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.maritalStatus
                ? "border-red-500"
                : form.maritalStatus
                ? "border-green-600"
                : "border-gray-600"
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
          {touched && !form.maritalStatus && (
            <p className="text-red-500 text-sm mt-1">Please select your marital status</p>
          )}
        </motion.div>
        {/* Residential Status */}
        <motion.div animate={touched && !form.residentialStatus ? shake : {}}>
          <label
            className={`text-gray-800 text-md ${
              touched && !form.residentialStatus ? "text-red-500" : ""
            }`}
          >
            Residential status
          </label>
          <select
            value={form.residentialStatus}
            onChange={(e) =>
              setForm({ ...form, residentialStatus: e.target.value })
            }
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.residentialStatus
                ? "border-red-500"
                : form.residentialStatus
                ? "border-green-700"
                : "border-gray-600"
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
          {touched && !form.residentialStatus && (
            <p className="text-red-500 text-sm mt-1">Please select your residential status</p>
          )}
        </motion.div>
        {/* Occupation */}
        <motion.div animate={touched && !form.occupation ? shake : {}}>
          <label
            className={`text-gray-800 text-md ${
              touched && !form.occupation ? "text-red-500" : ""
            }`}
          >
            Occupation
          </label>
          <input
            type="text"
            placeholder="e.g. Entrepreneur"
            value={form.occupation}
            onChange={(e) =>
              setForm({ ...form, occupation: e.target.value })
            }
            className={`mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.occupation
                ? "border-red-500"
                : form.occupation
                ? "border-green-600"
                : "border-gray-600"
            }`}
          />
          {touched && !form.occupation && (
            <p className="text-red-500 text-sm mt-1">Occupation is required</p>
          )}
        </motion.div>
        <h2 className="text-2xl font-medium mt-8 mb-5">Next Of kin</h2>
        {/* Full Name */}
        <motion.div animate={touched && (!form.firstName || !form.otherNames) ? shake : {}}>
          <label
            className={`text-gray-800 text-md ${
              touched && (!form.firstName || !form.otherNames) ? "text-red-500" : ""
            }`}
          >
            Full name
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
                touched && !form.firstName
                  ? "border-red-500"
                  : form.firstName
                  ? "border-green-600"
                  : "border-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Other names"
              value={form.otherNames}
              onChange={(e) =>
                setForm({ ...form, otherNames: e.target.value })
              }
              className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
                touched && !form.otherNames
                  ? "border-red-500"
                  : form.otherNames
                  ? "border-green-600"
                  : "border-gray-600"
              }`}
            />
          </div>
          {touched && (!form.firstName || !form.otherNames) && (
            <p className="text-red-500 text-sm mt-1">Please enter full name</p>
          )}
        </motion.div>
        {/* Date of Birth */}
        <motion.div animate={touched && !form.dob ? shake : {}}>
          <label
            className={`text-gray-800 text-md ${
              touched && !form.dob ? "text-red-500" : ""
            }`}
          >
            Date of birth
          </label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
            className={`mb-5 mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && !form.dob ? "border-red-500" : form.dob ? "border-green-600" : "border-gray-600"
            }`}
          />
          {touched && !form.dob && (
            <p className="text-red-500 text-sm mt-1">Date of birth is required</p>
          )}
        </motion.div>
        {/* Phone */}
        <motion.div
          animate={touched && (!form.phone || !isPhoneValid(form.phone)) ? shake : {}}
        >
          <label
            className={`text-gray-800 text-md ${
              touched && (!form.phone || !isPhoneValid(form.phone))
                ? "text-red-500"
                : touched && form.phone && isPhoneValid(form.phone)
                ? "text-green-500"
                : ""
            }`}
          >
            Phone number
          </label>
          <input
            type="text"
            placeholder="+233 244-563-012"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`mt-5 py-4 px-3 w-full rounded-lg border-1 ${
              touched && (!form.phone || !isPhoneValid(form.phone))
                ? "border-red-500"
                : touched && form.phone && isPhoneValid(form.phone)
                ? "border-green-700"
                : "border-gray-600"
            }`}
          />
          {touched && !form.phone && (
            <p className="text-red-500 text-md mt-3">Phone number is required</p>
          )}
          {touched && form.phone && !isPhoneValid(form.phone) && (
            <p className="text-red-500 text-md mt-3">
              Invalid format. Use +233 xxx-xxx-xxx
            </p>
          )}
        </motion.div>
        <button
          onClick={handleNext}
          className="text-lg font-medium py-3 px-4 w-full mt-10 rounded-lg bg-[#0b3c39] text-white"
        >
          Next
        </button>
      </form>
    </div>
  );
}
export default InvestorProfile;