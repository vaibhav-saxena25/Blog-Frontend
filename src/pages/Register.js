import React,{useState} from 'react'
import {Box,Typography,TextField,Button} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate()
  const [inputs,setInputs] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleChange = (e) => {
    setInputs(prevState=>({...prevState,[e.target.name]:e.target.value}))
  }
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/user/register-user', {
        username: inputs.name, // Change 'name' to 'username' to match schema
        email: inputs.email,
        password: inputs.password
      });
      if (data.success) {
        toast.success('User registered successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    }
  };
  
  return (
    <>
    <form onSubmit = {handleSubmit}>
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
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>REGISTER</Typography>
        <TextField value = {inputs.name} onChange={handleChange} placeholder = "name" name = "name" margin="normal" type = {"text"} required/>
        <TextField value = {inputs.email} onChange={handleChange} placeholder = "email" name = "email" margin="normal" type = {"email"} required/>
        <TextField value = {inputs.password} onChange={handleChange} placeholder = "password" name = "password" margin="normal" type = {"password"} required/>
       
        <Button type = "submit" sx = {{borderRadius:3,marginTop:3}} variant = "contained" color = "primary">Submit</Button>
        <Button onClick = {()=>navigate('/login')} sx = {{borderRadius:3,marginTop:3}} >Already Register? Please Login</Button>


      </Box>
      </form>
    </>
  )
}

export default Register
