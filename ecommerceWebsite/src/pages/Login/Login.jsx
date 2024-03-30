import React, { useState } from 'react';
import './login.scss'; // Import your SCSS file
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axiosInstance from '../../features/products/axios';
import { useNavigate } from 'react-router-dom';
import { userLoggedIn } from '../../features/products/authSlice';
const Login = () => {
  const[data,setData]=useState({
    email:'',
    password:''
  })

 const dispatch=useDispatch()
 const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
			.post(`token/`, {
				email: data.email,
				password: data.password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');

        dispatch(userLoggedIn(data.email,data.password))
				navigate("/")
        
				//console.log(res);
				//console.log(res.data);
			});
  
  };

  return (
  <>   
   <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({
            ...data,
            email:e.target.value
          })}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(e) => setData({
            ...data,
            password:e.target.value
          })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
    <p>Dont have an account ? <Link to='/register' style={
       {
        color:"blue",
        textDecoration:"none"
       }
    }>Signup</Link></p>
    </>

  );
};

export default Login;
