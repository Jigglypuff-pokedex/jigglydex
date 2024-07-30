import React, { useState } from 'react';
import './signup.css';
import hi from '../../assets/hihi.png';
import logo from '../../assets/logo2.png';
import Navbar from '../../components/Navbar/Navbar.jsx';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState(false);

  // POST request
  const handleSignup = (e) => {
    e.preventDefault();

    const user = { firstName, lastName, email, username, password };

    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success -->', data);
        setSuccess('Signup successful!');
        setError(false);
      })
      // catch error
      .catch((error) => {
        console.error('Error', error);
        setSuccess('');
        setError(true);
      });
  };

  return (
    <>
      <Navbar noBackground showLogo={false} />
      <div className='signup'>
        <div id="slide-in-text"><img src={logo} alt='logo' className='logo' /></div>
        <div className='form-container'>
          {/* sign up form */}
          <form onSubmit={handleSignup}>
            <div id='ques-signup'>
              <p>Step into the world of Pokémon
                <img src={hi} alt="Pokémon" className="poke-hi" />
              </p>
            </div>
            {/* firstname */}
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {/* lastname */}
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {/* email */}
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* username */}
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* password */}
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* signup button */}
            <button type="submit">Signup</button>
            {success && <p className='success-message'>{success}</p>}
            {error && <p className='error-message'>Signup failed. Please try again.</p>}
            {/* if user already have an account */}
            <div id='ques-signup'>
              <p>Already have an account?</p>
              <a href='/login'>Login</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
