import { useState } from "react";
import { Link } from "react-router-dom";
import ChatHelp from "./components/chatHelp";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  return (
    <div className="w-full h-screen bg-re-300 p-4">
      <div className="p-2 w-full bg-white mt-32 rounded-xl shadow-">
        <h2 className="text-5xl leading-normal">Welcome Back</h2>
        <p className="text-gray-700 text-xl mt-6">
          New user?
          <Link to="/signup">
            <span className="ml-3 text-blue-700 font-medium text-xl">
              Create account
            </span>
          </Link>{" "}
        </p>

        <form action="" className="mt-10">
          <div
            type="text"
            className="relative flex justify-center items-center w-full h-15 border-1 border-gray-500 rounded-md "
          >
             <span><FcGoogle className="w-6 h-6 mr-6"/></span>
            <span className="font-medium text-xl text-gray-700">
              Sign in with Google
            </span>
          </div>
          <div className="flex items-center mb-4 mt-8">
            <hr className="flex-1 border-gray-300" />
            <span className="px-2 text-gray-400 text-md">or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <input
            type="text"
            placeholder="Email Address"
            className="text-xl pl-4 text-gray-900 mt-5 w-full h-15 border-1 border-gray-500 rounded-md "
          />
          <input
            type="text"
            placeholder="Password"
            className="mb-5 text-xl pl-4 text-gray-900 mt-15 w-full h-15 border-1 border-gray-500 rounded-md "
          />
          <label htmlFor="" className="text-lg font-medium text-blue-600 ">
            Forgot password?
          </label>
          <button className="w-full h-15 bg-blue-600 rounded-md mt-15 ">
            <span className="font-medium text-white text-xl">Continue</span>
          </button>
          <ChatHelp />
        </form>
      </div>
    </div>
  );
}
export default SignIn;
