import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import AuthContainer from "./components/Login-Register/AuthContainer";
import useAuthStore from "./store/authStore";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AuthContainer />} />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
