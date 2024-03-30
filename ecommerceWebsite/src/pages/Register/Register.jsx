import React, { useState } from 'react';
import './register.scss'; // Import your SCSS file
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../features/products/axios';

const Register = () => {
  
  const navigate=useNavigate()
  const [data,setData] = useState({
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
  });
  const [errorMessage, setErrorMessage] = useState(null);

const {username,email,password}=data
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(data.password==data.confirmPassword && password.length>=8)
    {
 
     
      // const response = await axios.post(
      //   'http://127.0.0.1:8000/api/user/register/', // Replace with your actual API endpoint
      //   {user_name:username,
      //    email:email,
      //    password:password }
      // );
      // console.log(response.data); // Handle successful registration (optional)
      // // Redirect or display success message (optional)

      axiosInstance
			.post(`user/register/`, {
				email: email,
				user_name: username,
				password: password,
			})
			.then((res) => {
				navigate('/login')
				console.log(res);
				console.log(res.data);
			});

    } 
  }




  return (
    <>
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">UserName:</label>
        <input
          type="text"
          id="name"
          value={data.username}
          onChange={(e) => setData({
            ...data,
             username:e.target.value
          })}
        />
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
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={data.confirmPassword}
          onChange={(e) => setData({
            ...data,confirmPassword:e.target.value
          })}
        />
        <button type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
    <p>Already Registered ? <Link to='/login' style={
       {
        color:"blue",
        textDecoration:"none"
       }
    }>Login</Link></p>
    </>
  );
};


export default Register;
