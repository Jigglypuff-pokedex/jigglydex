import React, { useState , useEffect } from 'react';
import './login.css';
import hi from '../../assets/hihi.png'
import logo from '../../assets/logo2.png'
import Navbar from '../../components/Navbar/Navbar.jsx'

const Login = () => {
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [success , setSuccess] = useState('');
  const [error , setError] = useState(false);

  // POST request
    const handleLogin = (e) => {
      e.preventDefault;

      const user = { username , password };

      fetch('http://localhost:3000/login' , {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Successs' , data);
        setSuccess('Login successfully');
        setError(false);
      }) 
      // catch error
      .catch((error) => {
        console.error('Error' , error);
        setSuccess('');
        setError(true);
      })
    }

  return (
    <>
     <Navbar noBackground showLogo={false}/>
      <div className='signup'>
     <div id="slide-in-text"><img src={logo} alt='logo' className='logo' /></div>
      <div className='form-container2'> 
        {/* login form */}
        <form onSubmit={handleLogin}>
            <div id='ques-signup'>
                <p>Welcome back to world of Pokémon 
                <img src={hi} alt="Pokémon" className="poke-hi" />
                </p>
            </div>
            {/* username */}
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          {/* password */}
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {/* login button */}
          <button type="submit">Login</button>
          {success && <p className='success-message'>{success}</p>}
          {error && <p className='error-message'>{error}</p>}
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
