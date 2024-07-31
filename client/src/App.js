// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home/Home.jsx';
import Library from './pages/Library/library.jsx';
import Signup from '../src/pages/Signup/Signup.jsx';
import Login from '../src/pages/Login/Login.jsx';
import Evolutions from '../src/pages/Evolution/evolutions.jsx'; 
import Battle from '../src/pages/Battle/battle.jsx';
import PokemonGachaMachine from './pages/Pokegacha/pokegacha.jsx';
import Collections from './pages/Collections/collections.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/evolutions" element={<Evolutions />} /> {/* Add Evolutions route */}
        <Route path="/battle" element={<Battle />} />
        <Route path="/library" element={<Library />} />
        <Route path="/pokemonGacha" element={<PokemonGachaMachine />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </Router>
  );
};

export default App;