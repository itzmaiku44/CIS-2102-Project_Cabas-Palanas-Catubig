import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthContainer from "./components/AuthContainer";
import Dashboard from "./components/Dashboard";
import ExistingBudgets from "./components/ExistingBudget";
import Expenses from "./components/Expenses";
import RecentExpenses from "./components/RecentExpenses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/existing-budgets" element={<ExistingBudgets />} />
        <Route path="/recent-expenses" element={<RecentExpenses />} />
      </Routes>
    </Router>
  );
}

export default App;