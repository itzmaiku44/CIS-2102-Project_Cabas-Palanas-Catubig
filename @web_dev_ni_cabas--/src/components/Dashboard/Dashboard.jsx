import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';       
import Content1 from './Content/Content1';
import Content2 from './Content/Content2';
import Content3 from './Content/Content3';

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeContent, setActiveContent] = useState('dashboard'); // Default view
  
  // Example profile data - you might want to get this from your auth context/state
  const profileData = {
    name: "John Doe",
    email: "john@example.com",
    birthdate: "1990-01-01",
    image: "/profile-placeholder.jpg",
    password: "********"
  };

  const handleSettingsClick = () => {
    // Handle settings click
    console.log('Settings clicked');
  };

  const handleProfileClick = () => {
    // Handle profile click
    console.log('Profile clicked');
  };

  // Function to handle content switching
  const renderContent = () => {
    switch(activeContent) {
      case 'dashboard':
        return <Content1 profileData={profileData} />;
      case 'expenses':
        return <Content2 />;
      case 'budget':
        return <Content3 />;
      default:
        return <Content1 profileData={profileData} />;
    }
  };

  // Modified menu items with active content handling
  const menuItems = [
    { 
      icon: 'fa-chart-line', 
      label: 'Dashboard',
      onClick: () => setActiveContent('dashboard')
    },
    { 
      icon: 'fa-wallet', 
      label: 'Expenses',
      onClick: () => setActiveContent('expenses')
    },
    { 
      icon: 'fa-calculator', 
      label: 'Budget',
      onClick: () => setActiveContent('budget')
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar 
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          onSettingsClick={handleSettingsClick}
          onProfileClick={handleProfileClick}
          profileData={profileData}
          menuItems={menuItems}
          activeContent={activeContent}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 