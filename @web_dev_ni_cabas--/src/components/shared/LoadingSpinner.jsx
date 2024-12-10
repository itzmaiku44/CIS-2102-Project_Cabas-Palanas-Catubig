import React from "react";

const LoadingSpinner = ({ size = "medium", light = false }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div
        className={`rounded-full border-2 border-t-transparent ${
          light ? "border-white" : "border-blue-500"
        } border-solid h-full w-full`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
