import React, { useState } from "react";
import ErrorMessage from "../shared/ErrorMessage";
import LoadingSpinner from "../shared/LoadingSpinner";

const EditProfileModal = ({ profileData, setProfileData, onClose }) => {
  const [formData, setFormData] = useState(profileData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (formData.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number";
      }
      if (formData.password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProfileData(formData);
        setSaveSuccess(true);
        setTimeout(() => {
          onClose();
        }, 500);
      } catch (error) {
        setErrors({ submit: "Failed to save changes" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className="fixed inset-0 flex items-center justify-center z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-[#f8ebe2] rounded-lg p-6 w-[600px] relative transform transition-all duration-300 ${
            saveSuccess ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Edit Profile
          </h2>

          {/* Form Fields - 2x2 Grid Layout */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <FormField
              label="Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            <FormField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-4 w-full rounded p-2 transition-all duration-300 flex items-center justify-center
              ${isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"}
              ${saveSuccess ? "bg-green-500" : ""}
            `}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="small" light />
                <span className="ml-2 text-white">Saving...</span>
              </>
            ) : saveSuccess ? (
              <>
                <i className="fas fa-check mr-2"></i>
                <span className="text-white">Saved!</span>
              </>
            ) : (
              <span className="text-white">Save Changes</span>
            )}
          </button>

          {errors.submit && (
            <div className="mt-2">
              <ErrorMessage message={errors.submit} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Helper component for form fields
const FormField = ({ label, name, type, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-blue-600 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded p-2 ${
        error ? "border-red-500" : "border-gray-300"
      } text-black`}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    <ErrorMessage message={error} />
  </div>
);

export default EditProfileModal;
