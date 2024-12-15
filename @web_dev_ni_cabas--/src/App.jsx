import React, { useEffect } from "react";
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
import { CurrencyProvider } from "./context/CurrencyContext";
import { ThemeProvider } from "./context/ThemeContext";

// Protected Route Component
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

// 404 Page Component
const NotFound = () => <div>404: Page Not Found</div>;

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuth = useAuthStore((state) => state.setAuth);

  // Rehydrate auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setAuth(token, JSON.parse(user));
    }
  }, [setAuth]);

  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<AuthContainer />} />

            {/* Protected Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/budgets"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Budgets />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

export default App;
