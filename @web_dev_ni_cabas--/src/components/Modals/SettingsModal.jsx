import React, { useState } from 'react';
import ToggleSwitch from '../shared/ToggleSwitch';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../utils/propTypes';
import ErrorMessage from '../shared/ErrorMessage';
import LoadingSpinner from '../shared/LoadingSpinner';

const SettingsModal = ({ settings, setSettings, onClose }) => {
  const [formData, setFormData] = useState(settings);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      
      // Validate currency
      const validCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'PHP'];
      if (!validCurrencies.includes(formData.currency)) {
        setError('Please select a valid currency');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSettings(formData);
      setSaveSuccess(true);
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (err) {
      setError('An error occurred while saving settings');
    } finally {
      setIsSubmitting(false);
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
        <div className={`bg-white rounded-lg p-6 w-96 relative transform transition-all duration-300 ${
          saveSuccess ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}>
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 text-2xl"
          >
            <i className="fas fa-times"></i>
          </button>

          <h2 className="text-xl font-bold mb-4">Settings</h2>

          {error && <ErrorMessage message={error} />}

          <div className="flex justify-between items-center mb-4">
            <ToggleSwitch
              label="Dark Mode"
              value={formData.isDarkTheme}
              onChange={(value) => setFormData(prev => ({ ...prev, isDarkTheme: value }))}
            />
            <ToggleSwitch
              label="Notifications"
              value={formData.isNotificationEnabled}
              onChange={(value) => setFormData(prev => ({ ...prev, isNotificationEnabled: value }))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 font-bold">Currency</label>
            <select
              value={formData.currency}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, currency: e.target.value }));
                setError('');
              }}
              className={`w-full p-2 border rounded-md ${error ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="PHP">PHP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className={`w-full p-2 rounded-md transition-all duration-300 flex items-center justify-center
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
              <span className="text-white">Save Settings</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

SettingsModal.propTypes = {
  settings: CustomPropTypes.settings.isRequired,
  setSettings: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsModal; 