import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="text-red-500 text-sm mt-1">
      <i className="fas fa-exclamation-circle mr-1"></i>
      {message}
    </div>
  );
};

export default ErrorMessage;
