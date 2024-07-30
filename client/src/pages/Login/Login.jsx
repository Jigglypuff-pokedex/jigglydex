import React from 'react';
import './login.css';
import hi from '../../assets/hihi.png'
import logo from '../../assets/logo2.png'
import Navbar from '../../components/Navbar/Navbar.jsx'

const Login = () => {

  return (
    <>
     <Navbar noBackground showLogo={false}/>
      <div className='signup'>
     <div id="slide-in-text"><img src={logo} alt='logo' className='logo' /></div>
      <div className='form-container2'> 
        <form>
            <div id='ques-signup'>
                <p>Welcome back to world of Pokémon 
                <img src={hi} alt="Pokémon" className="poke-hi" />
                </p>
            </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
