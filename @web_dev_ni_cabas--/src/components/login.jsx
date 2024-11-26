import React, { useState } from "react";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // Default state:  Login

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-[90%] max-w-5xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

        {/* Picture Holder */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-blue-600 text-white flex items-center justify-center font-bold transition-transform duration-1000 rounded-3xl ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img src="../../public/bg1.jpg" alt="" className="h-2/3 w-3/4-"/>
        </div>

        {/* Register Form (Left Side) */}
        <div
          className={`w-1/2 p-12 transition-opacity ease-in-out duration-500 ${
            isLogin ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-6">Register</h2>
          <form>
            <label className="block mb-4">
              <span className="text-blue-700">Username</span>
              <input
                type="text"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
                placeholder="Enter your username"
              />
            </label>
            <label className="block mb-4">
              <span className="text-blue-700">Email</span>
              <input
                type="email"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
                placeholder="Enter your email"
              />
            </label>
            <label className="block mb-4">
              <span className="text-blue-700">Birthdate</span>
              <input
                type="date"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
              />
            </label>
            <label className="block mb-4">
              <span className="text-blue-700">Password</span>
              <input
                type="password"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
                placeholder="Enter your password"
              />
            </label>
            <label className="block mb-6">
              <span className="text-blue-700">Confirm Password</span>
              <input
                type="password"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
                placeholder="Confirm your password"
              />
            </label>
            <p className="mt-4 mb-4 text-sm text-gray-500">
            Already have an account?{" "}
            <a
              className="text-orange-500 hover:underline cursor-pointer"
              onClick={() => setIsLogin(true)}
            >
              Login
            </a>
            </p>
            <button
              type="submit"
              className="w-40 ml-60 bg-blue-700 text-white py-2 rounded-3xl hover:bg-blue-800"
            >
              Register
            </button>
          </form>
          
        </div>

        {/* Login Form (Right Side) */}
        <div
          className={`w-1/2 p-12 transition-opacity ease-in-out duration-500 ${
            isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <h2 className="text-4xl font-bold text-blue-700 mb-8 mt-36">Login</h2>
          <form>
            <label className="block mb-4">
              <span className="text-blue-700">Email</span>
              <input
                type="email"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
                placeholder="Enter your email"
              />
            </label>
            <label className="block mb-6">
              <span className="text-blue-700">Password</span>
              <input
                type="password"
                className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
                placeholder="Enter your password"
              />
            </label>
            <p className="mt-4 mb-4 text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              className="text-orange-500 hover:underline cursor-pointer"
              onClick={() => setIsLogin(false)}
            >
              Register
            </a>
          </p>
            <button
              type="submit"
              className="w-40 ml-60 bg-blue-700 text-white py-2 rounded-3xl hover:bg-blue-800"
            >
              Login
            </button>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
