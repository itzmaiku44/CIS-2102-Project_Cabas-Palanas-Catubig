import React from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ 
  icon = '', 
  label = '', 
  isActive = false, 
  isExpanded = true,
  onClick = () => {} 
}) => {
  return (
    <li 
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${isActive
          ? "bg-gradient-to-tr from-indigo-600 to-indigo-500 text-yellow-300"
          : "hover:bg-indigo-600 text-white"}
      `}
      onClick={onClick}
    >
      <i className={`fas ${icon} ${isActive ? 'text-yellow-300' : 'text-white'}`}></i>
      {isExpanded && (
        <span className="ml-3 duration-300">{label}</span>
      )}
    </li>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  isActive: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onClick: PropTypes.func
};

export default SidebarItem; 