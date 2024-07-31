import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/newlogo.png'
import pokeball from '../../assets/pkball.png';

const Navbar = ({ noBackground,showLogo }) => {
  const location = useLocation();
  const isSignupPage = location.pathname !== '/';
  
  return (
    <nav className={`navbar ${noBackground ? 'no-background' : ''}`}>
      <div className="navbar-brand">
      {showLogo && (
          <Link to="/" className="nav-link">
            <img src={logo} alt="logo" id="logo" style={{ width: '150px', height: 'auto', marginLeft: '100px' }} />
          </Link>
        )}      
        </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          {isSignupPage && <img src={pokeball} alt="Pokéball" className="pokeball-icon" />}
          Home
        </Link>
        <Link to="/signup" className="nav-link">
          {isSignupPage && <img src={pokeball} alt="Pokéball" className="pokeball-icon" />}
          Signup
        </Link>
        <Link to="/login" className="nav-link">
          {isSignupPage && <img src={pokeball} alt="Pokéball" className="pokeball-icon" />}
          Login
        </Link>
        <Link to="/library" className="nav-link">
          {isSignupPage && <img src={pokeball} alt="Pokéball" className="pokeball-icon" />}
          Jiggly Dash
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
