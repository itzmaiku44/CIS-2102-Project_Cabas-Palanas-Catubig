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

  // Sample expenses data
  const expenses = [
    { name: 'Groceries', amount: 2500, date: '2024-03-15', budget: 'Food' },
    { name: 'Gas', amount: 1000, date: '2024-03-14', budget: 'Travel' },
    { name: 'Restaurant', amount: 1500, date: '2024-03-13', budget: 'Food' },
    { name: 'Taxi', amount: 500, date: '2024-03-12', budget: 'Travel' },
  ];

  // Sample budgets data
  const budgets = [
    { category: 'Food', amount: 10000 },
    { category: 'Travel', amount: 5000 },
    { category: 'Shopping', amount: 3000 },
    { category: 'Entertainment', amount: 2000 },
    { category: 'Health', amount: 4000 },
  ];

  // Modal handlers
  const modalHandlers = {
    expense: {
      add: { setIsOpen: () => console.log('Add expense modal') },
      delete: { setIsOpen: () => console.log('Delete expense modal') },
    }
  };

  // Selection handlers
  const selectionHandlers = {
    expense: {
      setSelected: (expense) => console.log('Selected expense:', expense),
    }
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
        return <Content2 
          expenses={expenses}
          budgets={budgets}
          modalHandlers={modalHandlers}
          selectionHandlers={selectionHandlers}
        />;
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