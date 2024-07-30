import React from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx'
import Dashboard from './components/Dashboard/dashboard';
import Signup from '../src/pages/Signup/Signup.jsx'
import Login from '../src/pages/Login/Login.jsx'

const App = () => {
    
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>

  );
};

export default App;