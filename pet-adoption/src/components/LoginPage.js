import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import logo from '../assets/logo.png'; // Importing the logo

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const userRole = response.data.role;
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <StyledWrapper>
      <div className="admin-button-container">
        <button className="admin-button" onClick={() => navigate('/admin')}>
          Admin Login
        </button>
      </div>

      {/* Background logo */}
      <div className="background-logo">
        <img src={logo} alt="Pen Pets Logo" className="background-image" />
      </div>

      <form className="form" onSubmit={handleLogin}>
        {/* Title added here */}
        <h1 className="form-title">Pen Pets</h1>

        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <input 
            type="text" 
            className="input" 
            placeholder="Enter your Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex-column">
          <label>Password </label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Remember me </label>
          </div>
          <span className="span">Forgot password?</span>
        </div>
        <button className="button-submit">Sign In</button>

        <p className="p">
          Don&apos;t have an account? <Link to="/signup" className="span">Sign Up</Link>
        </p>

        {/* Terms and conditions and location */}
        <p className="small-text">Terms and Conditions apply.</p>
        <p className="small-text">Based in South Africa</p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #2c2c2c;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: -1;
  }

  .admin-button-container {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .admin-button {
    background-color: #151717;
    border: none;
    color: white;
    font-size: 14px;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
  }

  .background-logo {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0; /* Ensures the logo is behind the form */
    opacity: 0.1;
    width: 400px;
    height: 400px;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 600px; /* Increased width for more room */
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* Form title styling */
  .form-title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #151717;
  }

  .flex-column label {
    font-weight: bold; /* Bold label text for Email and Password */
    font-size: 14px;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: all 0.3s ease-in-out;
  }

  .inputForm:focus-within {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
    background: transparent;
    outline: none;
  }

.button-submit {
  margin: 20px 0 10px 0;
  background-color: #151717;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0); /* Initial state with no shadow */
}

.button-submit:hover {
  background-color: #505050; /* Dark grey on hover */
  box-shadow: 0 0 10px rgba(128, 128, 128, 0.7), /* Subtle grey glow */
              0 0 15px rgba(128, 128, 128, 0.5), 
              0 0 20px rgba(128, 128, 128, 0.4); /* Reduced brightness */
  color: white;
}


  .p {
    text-align: center;
    color: grey;
    font-size: 14px;
    margin: 5px 0;
  }

  .span {
    font-size: 14px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
  }

  /* Small text for terms and location */
  .small-text {
    text-align: center;
    font-size: 12px;
    color: grey;
    margin-top: 5px;
  }
`;

export default LoginPage;
