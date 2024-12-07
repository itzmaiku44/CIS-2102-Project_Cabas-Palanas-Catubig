import React from 'react';

const Sidebar = ({ isSidebarExpanded, toggleSidebar, toggleProfileModal, toggleSettingsModal, onNavigate }) => {
  return (
    <div className={`${
      isSidebarExpanded ? "w-60" : "w-16"
    } bg-blue-600 text-white transition-all duration-300 flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-3 mt-4">
        <span className={`${isSidebarExpanded ? "block" : "hidden"} font-bold text-xl mt-7 text-center`}>
          SHEPHERD'S LEDGER
        </span>
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-blue-700 p-2 rounded"
        >
          <i className={`fas fa-angle-${isSidebarExpanded ? 'left' : 'right'}`}></i>
        </button>
      </div>
      <ul className="flex-1 mt-10">
        <li className="hover:bg-blue-700 p-5 flex items-center" onClick={toggleProfileModal}>
          <i className="fas fa-user"></i>
          {isSidebarExpanded && <span className="ml-3 font-semibold">Profile</span>}
        </li>
        <li className="hover:bg-blue-700 p-5 flex items-center" onClick={() => onNavigate('dashboard')}>
          <i className="fas fa-chart-line"></i>
          {isSidebarExpanded && <span className="ml-3 font-semibold">Dashboard</span>}
        </li>
        <li className="hover:bg-blue-700 p-5 flex items-center" onClick={() => onNavigate('expenses')}>
          <i className="fas fa-wallet"></i>
          {isSidebarExpanded && <span className="ml-3 font-semibold">Expenses</span>}
        </li>
        <li className="hover:bg-blue-700 p-5 flex items-center" onClick={() => onNavigate('budget')}>
          <i className="fas fa-calculator"></i>
          {isSidebarExpanded && <span className="ml-3 font-semibold">Budget</span>}
        </li>
      </ul>
      <div className="p-6 hover:bg-blue-700 flex items-center">
        <i className="fas fa-sign-out-alt"></i>
        {isSidebarExpanded && <span className="ml-3 font-semibold">Logout</span>}
      </div>
      <div className="p-6 mb-10 hover:bg-blue-700 flex items-center" onClick={toggleSettingsModal}>
        <i className="fas fa-cog"></i>
        {isSidebarExpanded && <span className="ml-3 font-semibold">Settings</span>}
      </div>
    </div>
  );
};

export default Sidebar;