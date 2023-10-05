import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import {useDispatch, useSelector} from 'react-redux'
import { verifyLoginDetails } from "../../actions/userAction";
import {useNavigate} from 'react-router-dom'

const LoginPage = ({ changeCurrentTab }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isAuthenticated, loading, error} = useSelector((state) => state.user)
  const [loginCredentials, setLoginCredentials] = useState({})

  const handleLoginCredentials = (event) => {
    setLoginCredentials({...loginCredentials, [event.target.name]: event.target.value})
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(verifyLoginDetails(loginCredentials.email, loginCredentials.password))
  }

  // useEffect(() => {
  //   if(isAuthenticated){
  //     navigate('/login')
  //   }
  // }, [isAuthenticated])

  return (
    <div className="login-container">
      <form>
        <h1>Welcome to Instashop</h1>
        <div className="input-field">
          <input onChange={handleLoginCredentials} type="email" placeholder="Email" className="input" name="email"/>
        </div>
        <div className="input-field">
          <input onChange={handleLoginCredentials} type="password" placeholder="Password" className="password" name='password' />
          <i className="bx bx-hide eye-icon"></i>
        </div>
        <div className="forgot-link-container">
          <a href="#" className="forgot-pass">
            Forgot password?
          </a>
        </div>
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </form>
      <p className="signup-form-link">
        Don't have an account? <span onClick={() => {changeCurrentTab("signup")}}>Signup</span>
      </p>
    </div>
  );
};

export default LoginPage;
