import React, { useState } from "react";
import Login from "./login";
import Register from "./Register";

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true); // Default state: Login

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-[90%] max-w-5xl h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        {/* Picture Holder */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-blue-600 text-white flex items-center justify-center font-bold transition-transform duration-1000 rounded-3xl ${
            isLogin ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <img src="../../public/bg1.jpg" alt="" className="h-2/3 w-3/4" />
        </div>

        {/* Register Form */}
        <Register setIsLogin={setIsLogin} isVisible={!isLogin} />

        {/* Login Form */}
        <Login setIsLogin={setIsLogin} isVisible={isLogin} />
      </div>
    </div>
  );
};

export default AuthContainer; 