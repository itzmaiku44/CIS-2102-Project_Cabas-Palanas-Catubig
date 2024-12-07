import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import AuthContainer from './components/Login-Register/AuthContainer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;