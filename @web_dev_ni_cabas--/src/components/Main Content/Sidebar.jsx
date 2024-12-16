import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  CreditCard,
  Calculator,
  ArrowRight,
  ArrowLeft,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import ProfileModal from "../Modals/ProfileModal";
import SettingsModal from "../Modals/SettingsModal";
import useAuthStore from "../../store/authStore";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeContent, setActiveContent] = useState("");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuthStore(); // Access the logout function from Zustand store

  const menuItems = [
    {
      icon: <User size={20} />,
      label: "Profile",
      onClick: () => {
        setActiveContent("Profile");
        setIsProfileModalOpen(true);
      },
    },
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      onClick: () => {
        setActiveContent("Dashboard");
        navigate("/dashboard");
      },
    },
    {
      icon: <Calculator size={20} />,
      label: "Expenses",
      onClick: () => {
        setActiveContent("Expenses");
        navigate("/expenses");
      },
    },
    {
      icon: <CreditCard size={20} />,
      label: "Budgets",
      onClick: () => {
        setActiveContent("Budgets");
        navigate("/budgets");
      },
    },
  ];

  const bottomMenuItems = [
    {
      icon: <Settings size={20} />,
      label: "Settings",
      onClick: () => setIsSettingsModalOpen(true),
    },
    {
      icon: <LogOut size={20} />,
      label: "Logout",
      onClick: () => {
        logout();
        navigate("/");
      },
    },
  ];

  const SidebarItem = ({ icon, label, onClick, isActive }) => (
    <div
      onClick={onClick}
      className={`flex items-center gap-2 p-2 cursor-pointer rounded-md ${
        isActive
          ? "bg-blue-700 text-white"
          : "hover:bg-blue-600 hover:text-white text-blue-100"
      }`}
    >
      {icon}
      {isExpanded && <span>{label}</span>}
    </div>
  );

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    birthdate: "1990-01-01",
    image: null,
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleProfileEdit = () => {
    console.log("Edit Profile clicked");
  };

  const handleSettingsModalClose = () => {
    setIsSettingsModalOpen(false); // Close the Settings Modal
  };

  return (
    <div
      className={`h-screen bg-blue-800 text-blue-100 p-4 flex flex-col ${
        isExpanded ? "w-64" : "w-16"
      } transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        {isExpanded && (
          <h1 className="text-xl font-bold text-white">SHEPHERD'S LEDGER</h1>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-blue-700 p-1 rounded text-white"
        >
          {isExpanded ? <ArrowLeft /> : <ArrowRight />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col flex-grow">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            isActive={activeContent === item.label}
          />
        ))}
      </div>

      {/* Sidebar Bottom Menu */}
      <div className="mt-auto">
        {bottomMenuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            isActive={activeContent === item.label}
          />
        ))}
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <ProfileModal
          profileData={profileData}
          onClose={handleProfileModalClose}
          onEdit={handleProfileEdit}
        />
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal onClose={handleSettingsModalClose} />
      )}
    </div>
  );
};

export default Sidebar;
