import React from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ icon, label, isExpanded, onClick, isActive }) => {
  return (
    <li 
      className={`hover:bg-blue-700 p-5 flex items-center cursor-pointer ${
        isActive ? 'bg-blue-700' : ''
      }`}
      onClick={onClick}
    >
      <i className={`fas ${icon}`}></i>
      {isExpanded && <span className="ml-3 font-semibold">{label}</span>}
    </li>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
};

SidebarItem.defaultProps = {
  onClick: () => {},
};

export default SidebarItem; 