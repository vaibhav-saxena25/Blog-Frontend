import React,{useState,useEffect} from 'react'
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { server } from '../index'

const UserBlogs = () => {
    const [blogs,setBlogs] = useState([])
    const getUserBlogs = async()=>{
        try{
            const id = localStorage.getItem('userId');
            const {data} = await axios.get(`${server}/api/v1/blog/user-blog/${id}`);
            if(data?.success){
                setBlogs(data?.userBlog.blogs)
            }

        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getUserBlogs();
    },[]);
    console.log(blogs);
  return (
    
    <div>
  {blogs && blogs.length > 0 ? (
    blogs.map((blog) => (
      <BlogCard
        id={blog._id}
        isUser = {true}
        key={blog._id} // Add a unique key prop
        title={blog.title}
        description={blog.description}
        image={blog.image}
        username={blog.user?.username || 'Anonymous'}
        time={blog.createdAt}
      />
    ))
  ) : (
    <h1>You have not created any blogs.</h1>
  )}
</div>

    
  )
}

export default UserBlogs
