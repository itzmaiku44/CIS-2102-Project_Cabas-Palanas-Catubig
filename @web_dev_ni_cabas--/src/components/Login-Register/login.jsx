import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../shared/ErrorMessage";
import useAuthStore from "../../store/authStore";

const Login = ({ setIsLogin, isVisible }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validate inputs
    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    //try login first
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      const data = await response.json();
      if (response.ok) {
        setAuth(data.token, data.user);
        setError("");
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`w-1/2 p-12 transition-opacity ease-in-out duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <h2 className="text-4xl font-bold text-blue-700 mb-8 mt-36">Login</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-blue-700">Email</span>
          <input
            type="email"
            className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-6">
          <span className="text-blue-700">Password</span>
          <input
            type="password"
            className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {/* Display ErrorMessage component */}
        <ErrorMessage message={error} />

        <p className="mt-4 mb-4 text-sm text-gray-500">
          Don't have an account?{" "}
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
  );
};

export default Login;
