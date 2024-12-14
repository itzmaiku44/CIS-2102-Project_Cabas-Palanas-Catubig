import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../utils/propTypes';
import ErrorMessage from '../shared/ErrorMessage';
import LoadingSpinner from '../shared/LoadingSpinner';

const EditProfileModal = ({ profileData, setProfileData, onClose }) => {
  const [formData, setFormData] = useState(profileData);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (formData.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
      }
      if (formData.password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    // Birthdate validation
    if (!formData.birthdate) {
      newErrors.birthdate = 'Birthdate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfileData(formData);
        setSaveSuccess(true);
        setTimeout(() => {
          onClose();
        }, 500);
      } catch (error) {
        setErrors({ submit: 'Failed to save changes' });
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
      <div className="fixed inset-0 flex items-center justify-center z-[60]" onClick={(e) => e.stopPropagation()}>
        <div 
          className={`bg-[#f8ebe2] rounded-lg p-6 w-[600px] relative transform transition-all duration-300 ${
            saveSuccess ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 text-lg"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-2xl font-bold text-blue-600 mb-6">Edit Profile</h2>
          
          <div className="flex">
            {/* Form Fields */}
            <div className="flex-grow pr-4">
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
                label="Birthdate"
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleInputChange}
                error={errors.birthdate}
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

            {/* Profile Image Upload */}
            <div className={`w-48 h-48 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 relative transition-all duration-300 ${
              isSubmitting ? 'opacity-50' : 'opacity-100'
            }`}>
              {formData.image ? (
                <img 
                  src={formData.image} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-opacity duration-300" 
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-4 w-full rounded p-2 transition-all duration-300 flex items-center justify-center
              ${isSubmitting ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'}
              ${saveSuccess ? 'bg-green-500' : ''}
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
      className={`w-full border rounded p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
    <ErrorMessage message={error} />
  </div>
);

EditProfileModal.propTypes = {
  profileData: CustomPropTypes.profileData.isRequired,
  setProfileData: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default EditProfileModal; 