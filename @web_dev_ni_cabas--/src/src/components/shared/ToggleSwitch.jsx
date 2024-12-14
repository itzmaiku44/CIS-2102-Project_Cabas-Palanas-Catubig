import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ label, value, onChange }) => {
  return (
    <div className="flex items-center">
      <button
        className={`w-12 h-6 flex items-center rounded-full ${
          value ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={() => onChange(!value)}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
      <span className="ml-2 font-semibold">{label}</span>
    </div>
  );
};

ToggleSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ToggleSwitch; 