import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../shared/ErrorMessage";
import useAuthStore from "../../store/authStore";

const Register = ({ setIsLogin, isVisible }) => {
  const navigate = useNavigate();
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!name.trim()) {
      setError("Username is required.");
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setError("A valid email address is required.");
      return;
    }

    if (!birthdate) {
      setError("Birthdate is required.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Convert birthdate to ISO 8601 format
    const isoBirthdate = new Date(birthdate).toISOString();

    // Backend API call
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          birthdate: isoBirthdate,
          password,
        }),
      });

      const data = await response.json();

      console.log(data.token, data.user);
      if (response.ok) {
        setError("");
        setAuth(data.token, data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError("An error occurred. Please try again.");
    }
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
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
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
        <label className="block mb-4">
          <span className="text-blue-700">Birthdate</span>
          <input
            type="date"
            className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span className="text-blue-700">Password</span>
          <input
            type="password"
            className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="block mb-6">
          <span className="text-blue-700">Confirm Password</span>
          <input
            type="password"
            className="w-full p-2 mt-1 rounded-lg bg-gray-100 border-gray-300 shadow-sm"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {/* Display ErrorMessage component */}
        <ErrorMessage message={error} />

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
