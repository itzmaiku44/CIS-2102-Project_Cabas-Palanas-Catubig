import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import ExistingBudgets from "./components/ExistingBudgets";
import Expenses from "./components/Expenses";
import RecentExpenses from "./components/RecentExpenses";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // i replace rani in due time kay static pa
  const budgets = [
    { id: 1, category: "Food", amount: 5000 },
    { id: 2, category: "Transport", amount: 2000 },
  ];

  const expenses = [
    { id: 1, category: "Groceries", amount: 1500, date: "2023-12-01" },
    { id: 2, category: "Taxi", amount: 300, date: "2023-12-01" },
  ];

  const recentExpenses = [
    { id: 1, category: "Dining", amount: 700 },
    { id: 2, category: "Movies", amount: 400 },
  ];

  // Conditional rendering: show login/register or dashboard
  return (
    <div className="app-container bg-gray-100 min-h-screen">
      {!isLoggedIn ? (
        <AuthForm />
      ) : (
        <div className="dashboard p-4 space-y-4">
          <h1 className="text-3xl font-bold">Welcome to Budget Tracker</h1>
          <ExistingBudgets budgets={budgets} />
          <Expenses expenses={expenses} />
          <RecentExpenses recentExpenses={recentExpenses} />
        </div>
      )}
    </div>
  );
};

export default App;