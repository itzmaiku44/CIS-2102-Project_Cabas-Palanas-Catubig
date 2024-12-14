import React from 'react';
import PropTypes from 'prop-types';

const WelcomeSection = ({ userName }) => {
  return (
    <div className="text-2xl font-bold mb-6">
      Welcome, <span className="text-blue-500">{userName}</span>
    </div>
  );
};

WelcomeSection.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default WelcomeSection; 