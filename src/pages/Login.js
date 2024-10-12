import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { server } from '../index';

const Login = () => {
  // Hooks should be at the top level of the component
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/api/v1/user/login`, {
         // Ensure 'username' is used in the backend
        email: inputs.email,
        password: inputs.password
      });
      if (data.success) {
        localStorage.setItem('userId', data?.user._id);
        dispatch(authActions.login());
        
        toast.success('User logged in successfully');
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: '400px',
            margin: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
            LOGIN
          </Typography>
        
          <TextField
            value={inputs.email}
            onChange={handleChange}
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            required
          />
          <TextField
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            required
          />
          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate('/register')}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
