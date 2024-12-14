import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import { SettingsModal, ProfileModal, EditProfileModal } from '../Modals';

const Sidebar = ({ 
  isExpanded, 
  setIsExpanded, 
  profileData,
  menuItems,
  activeContent
}) => {
  const navigate = useNavigate();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    isDarkTheme: false,
    isNotificationEnabled: true,
    currency: 'PHP'
  });

  const handleLogout = () => {
    navigate('/');
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleEditProfile = () => {
    setShowProfileModal(false);
    setShowEditProfileModal(true);
  };

  const bottomMenuItems = [
    { icon: 'fas fa-cog', label: 'Settings', onClick: handleSettingsClick },
    { icon: 'fas fa-sign-out-alt', label: 'Logout', onClick: handleLogout },
  ];

  return (
    <>
      <div className={`${isExpanded ? "w-60" : "w-16"} bg-blue-600 text-white transition-all duration-300 flex flex-col h-screen`}>
        {/* Sidebar content */}
        <div className="flex items-center justify-between px-4 py-3">
          {isExpanded && <span className="font-bold text-xl">SHEPHERD'S LEDGER</span>}
          <button onClick={() => setIsExpanded(!isExpanded)}>
            <i className={`fas ${isExpanded ? "fa-angle-left" : "fa-angle-right"}`} />
          </button>
        </div>
        
        <ul className="flex-grow">
          <SidebarItem 
            icon="fa-user"
            label={profileData.name}
            isExpanded={isExpanded}
            onClick={handleProfileClick}
          />
          {menuItems.map((item, index) => (
            <SidebarItem 
              key={index}
              icon={item.icon}
              label={item.label}
              isExpanded={isExpanded}
              onClick={item.onClick}
              isActive={activeContent === item.label.toLowerCase()}
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

      {/* Modals */}
      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          profileData={profileData}
          onClose={() => setShowProfileModal(false)}
          onEdit={handleEditProfile}
        />
      )}

      {showEditProfileModal && (
        <EditProfileModal
          profileData={profileData}
          setProfileData={(updatedProfile) => {
            // Update profile data in your app state/context
            console.log('Updated profile:', updatedProfile);
          }}
          onClose={() => setShowEditProfileModal(false)}
        />
      )}
    </>
  );
};

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  setIsExpanded: PropTypes.func.isRequired,
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthdate: PropTypes.string.isRequired,
    image: PropTypes.string,
    password: PropTypes.string.isRequired,
  }).isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  })).isRequired,
  activeContent: PropTypes.string.isRequired,
};

export default Sidebar; 