import React from 'react';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';

const Sidebar = ({ 
  isExpanded, 
  setIsExpanded, 
  onSettingsClick, 
  onProfileClick, 
  profileData 
}) => {
  const menuItems = [
    { icon: 'fa-user', label: profileData.name, onClick: onProfileClick },
    { icon: 'fa-chart-line', label: 'Dashboard' },
    { icon: 'fa-wallet', label: 'Expenses' },
    { icon: 'fa-calculator', label: 'Budget' },
  ];

  const bottomMenuItems = [
    { icon: 'fas fa-cog', label: 'Settings', onClick: onSettingsClick },
    { icon: 'fas fa-sign-out-alt', label: 'Logout' },
  ];

  return (
    <div className={`${isExpanded ? "w-60" : "w-16"} bg-blue-600 text-white transition-all duration-300 flex flex-col h-screen`}>
      {/* Sidebar content */}
      <div className="flex items-center justify-between px-4 py-3">
        {isExpanded && <span className="font-bold text-xl">SHEPHERD'S LEDGER</span>}
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <i className={`fas ${isExpanded ? "fa-angle-left" : "fa-angle-right"}`} />
        </button>
      </div>
      
      <ul className="flex-grow">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={item.icon}
            label={item.label}
            isExpanded={isExpanded}
            onClick={item.onClick}
          />
        ))}
      </ul>

      <ul className="mt-auto">
        {bottomMenuItems.map((item, index) => (
          <SidebarItem 
            key={index}
            icon={item.icon}
            label={item.label}
            isExpanded={isExpanded}
            onClick={item.onClick}
          />
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onProfileClick: PropTypes.func.isRequired,
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    image: PropTypes.string,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar; 