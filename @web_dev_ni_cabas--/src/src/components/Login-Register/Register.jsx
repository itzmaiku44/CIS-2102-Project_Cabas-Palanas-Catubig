import React from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsLogin, isVisible }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div
      className={`w-1/2 p-12 transition-opacity ease-in-out duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <h2 className="text-4xl font-bold text-blue-700 mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
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
  );
};

export default Register; 
