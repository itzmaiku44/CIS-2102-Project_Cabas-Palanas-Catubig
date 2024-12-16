import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Main Content/Dashboard";
import Expenses from "./components/Main Content/Expense Page/Expenses._main";
import Budgets from "./components/Main Content/Budget Page/Budget_main";
import AuthContainer from "./components/Login-Register/AuthContainer";
import useAuthStore from "./store/authStore";
import { ThemeProvider } from "./context/ThemeContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

// 404 Page Component
const NotFound = () => <div className="font-extrabold text-6xl text-center mt-48"><i class="fa-solid fa-ban mb-6"></i><br></br>404: Page Not Found</div>;

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<AuthContainer />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <ProtectedRoute>
                <Budgets />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
