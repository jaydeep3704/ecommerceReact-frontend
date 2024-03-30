import React, { useState, useEffect } from 'react';
import axiosInstance from '../../features/products/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../../features/products/authSlice';
const Logout = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logout=()=>{
        const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
        dispatch(userLoggedOut())
		navigate('/login')
    }

  return (
    <div onClick={logout}>
      Logout
    </div>
  )
}

export default Logout
