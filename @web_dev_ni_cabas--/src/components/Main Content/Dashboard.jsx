import React from "react";
import BudgetCarousel from "./Budget Page/BudgetCarousel";
import ExpensesTable from "./Expense Page/ExpensesTable";
import Sidebar from "./Sidebar";
import useAuthStore from "../../store/authStore";

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Main Content */}
      <div className="w-full p-12">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

        {/* Existing Budgets Section */}
        <section className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Existing Budgets</h2>
          </div>
          <BudgetCarousel />
        </section>

        {/* Recent Expenses Section */}
        <section className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Recent Expenses</h2>
          </div>
          <ExpensesTable />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
