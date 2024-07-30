import React from 'react';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx'
import Signup from '../src/pages/Signup/Signup.jsx'

const App = () => {
    
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      </Routes>
    </Router>

  );
};

export default App;
