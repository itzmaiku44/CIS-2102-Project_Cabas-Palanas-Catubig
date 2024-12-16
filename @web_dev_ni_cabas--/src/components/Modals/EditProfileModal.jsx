import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../shared/ErrorMessage";
import LoadingSpinner from "../shared/LoadingSpinner";
import useAuthStore from "../../store/authStore";

const EditProfileModal = ({ profileData, onClose }) => {
  const [formData, setFormData] = useState(profileData);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Access store values individually
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const updateUserProfile = useAuthStore((state) => state.updateUserProfile);
  console.log("User in EditProfileModal:", user);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    }
    if (formData.password && formData.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        const payload = {
          userId: user.id,
          name: formData.name,
          email: formData.email,
        };
        if (formData.password) {
          payload.password = formData.password;
        }

        const response = await fetch(
          "http://localhost:3000/users/changePassword",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        console.log("this is from response", response);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update profile");
        }

        const result = await response.json();
        console.log("Response:", result);
        if (result && result.data) {
          console.log("Updated user:", result.data);

          // Update user in store and localStorage
          updateUserProfile({
            ...user,
            ...result.data,
          });

          localStorage.setItem("user", JSON.stringify(result.data)); // Persist updated user
          setSaveSuccess(true);

          setTimeout(() => {
            onClose();
            navigate("/dashboard");
          }, 500);
        } else {
          throw new Error("User data missing in response");
        }
      } catch (error) {
        setErrors({
          submit: error.message || "Failed to save changes. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      ></div>
      <div
        className="fixed inset-0 flex items-center justify-center z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`bg-[#f8ebe2] rounded-lg p-6 w-[600px] relative transform transition-all duration-300 ${
            saveSuccess ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
          >
            <i className="fas fa-times"></i>
          </button>
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Edit Profile
          </h2>
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
              value={formData.password || ""}
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
            className={`mt-4 w-full rounded p-2 transition-all duration-300 flex items-center justify-center ${
              isSubmitting ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            } ${saveSuccess ? "bg-green-500" : ""}`}
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
          {errors.submit && <ErrorMessage message={errors.submit} />}
        </div>
      </div>
    </>
  );
};

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
    {error && <ErrorMessage message={error} />}
  </div>
);

export default EditProfileModal;
