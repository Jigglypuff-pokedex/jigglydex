import React from 'react';
import Dashboard from './components/Dashboard/dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;