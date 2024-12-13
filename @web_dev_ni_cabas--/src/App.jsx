import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthContainer from "./components/Login-Register/AuthContainer";
import useAuthStore from "./store/authStore";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ThemeProvider } from "./context/ThemeContext";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

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
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Route path="/dashboard" element={<Dashboard />} />
            </ProtectedRoute>

            {/* 404 Page */}
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

export default App;
