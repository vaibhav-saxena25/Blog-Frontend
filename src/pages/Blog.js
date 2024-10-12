import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const getAllBlogs = async(req,res)=>{
    try{
      const {data} = await axios.get('/api/v1/blog/all-blogs')

      console.log(data);
    
      if(data?.success){
        setBlogs(data?.blogs);
      }
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getAllBlogs();
  },[]);
  return (
    <div>
      {blogs && blogs.map(blog=><BlogCard id = {blog?._id} 
      isUser = {localStorage.getItem('userId')=== blog?.user._id} 
      title = {blog?.title} 
      description = {blog?.description} 
      image = {blog?.image} 
      username = {blog?.user.username} 
      time={blog?.createdAt}/>)}
    </div>
  )
}

export default Blog
