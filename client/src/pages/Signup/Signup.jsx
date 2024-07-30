import React from 'react';
import './signup.css';
import hi from '../../assets/hihi.png'
import logo from '../../assets/logo2.png'

const Signup = () => {

  return (
      <div className='signup'>
     <div id="slide-in-text"><img src={logo} alt='logo' className='logo' /></div>
      <div className='form-container'> 
        <form>
            <div id='ques-signup'>
                <p>Step into the world of Pokémon 
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
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" />
          </div>
          <button type="submit">Signup</button>
          <div id='login'><p>Already have an account?</p>
          <a href='/login'>Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
