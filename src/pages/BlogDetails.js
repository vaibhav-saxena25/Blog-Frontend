import React,{useState,useEffect} from 'react'

import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {Box, Typography,InputLabel, TextField, Button} from '@mui/material'
import toast from 'react-hot-toast';
import { server } from '../index'


const BlogDetails = () => {
    const [blog,setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        title:'',
        description:'',
        image:''

    })

    
    //get blog details
    const getBlogDetail = async(req,res)=>{
        try{
            const {data} = await axios.get(`${server}/api/v1/blog/get-blog/${id}`)
            if(data?.success){
                setBlog(data?.blog);
                setInputs({title:data?.blog.title,description:data?.blog.description,image:data?.blog.image})
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getBlogDetail();

    },[id])

    
    const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
        }));
      };
      
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.put(`${server}/api/v1/blog/update-blog/${id}`,
                {
                    title:inputs.title,
                    description:inputs.description,
                    image:inputs.image,
                    user:id
                }
            )
            if(data?.success){
                toast.success('Blog Updated');
                navigate('/my-blogs')
            }
            
        }catch(err){
            console.log(err)
        }
    }
    console.log(blog);
  return (
    <>
      <form onSubmit={handleSubmit}> 
        <Box   width = {'60%'} border = {3} borderRadius={10} padding={3} margin="auto" boxShadow={'10px 10px 20px #ccc '} display="flex" flexDirection={'column'} marginTop="30px">
            <Typography variant = "h2" textAlign={'center'} fontWeight = "bold" padding={3} color = "gray" >
                Update Blog

            </Typography>
            <InputLabel sx={{mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}}>
            Title
            </InputLabel>
            <TextField  name = "title" value = {inputs.title} onChange={handleChange} margin = "normal" variant='outlined' required/>
            <InputLabel sx={{mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}}>
            Description
            </InputLabel>
            <TextField  name = "description" value = {inputs.description} onChange={handleChange} margin = "normal" variant='outlined' required/>
            <InputLabel sx={{mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}}>
            Image URL
            </InputLabel>
            <TextField  name = "image" value = {inputs.image} onChange={handleChange} margin = "normal" variant='outlined' required/>
            <Button type = "submit" variant='contained' color='warning'>Update</Button>
        </Box>

      </form>
    </>
  )
}

export default BlogDetails
