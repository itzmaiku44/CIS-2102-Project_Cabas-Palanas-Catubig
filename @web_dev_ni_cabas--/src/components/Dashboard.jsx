import React from "react";
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';

const Dashboard = () => {
  return (
    <div id='root' className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <Sidebar />
        <Content />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;