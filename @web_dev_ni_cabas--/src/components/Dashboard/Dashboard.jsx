import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Content1 from "./Content/Content1";
import Content2 from "./Content/Content2";
import Content3 from "./Content/Content3";
import useAuthStore from "../../store/authStore"; // Import Zustand store

const Dashboard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard"); // Default view

  // Access the user data from Zustand store
  const user = useAuthStore((state) => state.user); // Get user data from Zustand store

  console.log(user);

  // Function to handle content switching
  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <Content1 profileData={user} />; // Use the user data from the store
      case "expenses":
        return <Content2 />;
      case "budget":
        return <Content3 />;
      default:
        return <Content1 profileData={user} />;
    }
  };

  // Modified menu items with active content handling
  const menuItems = [
    {
      icon: "fa-chart-line",
      label: "Dashboard",
      onClick: () => setActiveContent("dashboard"),
    },
    {
      icon: "fa-wallet",
      label: "Expenses",
      onClick: () => setActiveContent("expenses"),
    },
    {
      icon: "fa-calculator",
      label: "Budget",
      onClick: () => setActiveContent("budget"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          // Profile data is now coming from Zustand store
          profileData={user}
          menuItems={menuItems}
          activeContent={activeContent}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
