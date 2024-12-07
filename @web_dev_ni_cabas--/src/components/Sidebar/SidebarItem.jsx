import React from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ icon, label, isExpanded, onClick }) => {
  return (
    <li 
      className="hover:bg-blue-700 p-5 flex items-center cursor-pointer"
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
};

SidebarItem.defaultProps = {
  onClick: () => {},
};

export default SidebarItem; 