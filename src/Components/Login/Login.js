import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css';

export const Login = (props) => {
    const [password, setPass] = useState('');
    const [username, setName] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        navigate('dashboard')
    }

    const handleLogin = () => {
        if (username === 'admin@gmail.com' && password === '123456789') {
          setLoggedIn(true);
          alert('Login successful!');
        } else {
          alert('Invalid username or password');
        }
      };
  
    return (
        <div className="App">
            <div className="auth-form-container"> 
            <h2>Attribute Manager</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor = "name">UserName</label>
                    <input value={username} onChange={(e) => setName(e.target.value)} type = "name" placeholder="UserName" />
                    <label htmlFor = "password">Password</label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type = "password" placeholder="**********" id="password" name="password" />
                    <button onClick={handleLogin}>Log In</button>
                </form>
                    
            </div>   
        </div>
   
    )

}
export default Login;





