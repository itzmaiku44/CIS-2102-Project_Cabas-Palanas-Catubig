import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import { SettingsModal, ProfileModal, EditProfileModal } from './components/Modals';


const App = () => {
  // Core state
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  
  // Modal states
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  
  // User/Profile state
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    birthdate: '1990-01-01',
    image: null,
    password: '1234',
  });

  // Settings state
  const [settings, setSettings] = useState({
    isDarkTheme: false,
    isNotificationEnabled: true,
    currency: 'USD',
  });

  return (
    <div className="flex h-screen">
      <Sidebar 
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
        profileData={profileData}
      />
      
      <Dashboard profileData={profileData} />

      {isSettingsModalOpen && (
        <SettingsModal 
          settings={settings}
          setSettings={setSettings}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      )}

      {isProfileModalOpen && (
        <ProfileModal 
          profileData={profileData}
          onClose={() => setIsProfileModalOpen(false)}
          onEdit={() => {
            setIsProfileModalOpen(false);
            setIsEditProfileModalOpen(true);
          }}
        />
      )}

      {isEditProfileModalOpen && (
        <EditProfileModal 
          profileData={profileData}
          setProfileData={setProfileData}
          onClose={() => setIsEditProfileModalOpen(false)}
        />
      )}
    </div>
  );
};



export default App;