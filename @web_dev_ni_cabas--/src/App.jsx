import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard";
import AuthContainer from "./components/Login-Register/AuthContainer";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<AuthContainer />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;