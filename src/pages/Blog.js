import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { server } from '../index';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/blog/all-blogs`);
      console.log(data);

      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.map((blog) => (
        <BlogCard
          key={blog?._id} // Ensure there's a key for each mapped item
          id={blog?._id}
          isUser={localStorage.getItem('userId') === blog?.user?._id} // Add null-check for blog.user
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          username={blog?.user?.username} // Add null-check for blog.user
          time={blog?.createdAt}
        />
      ))}
    </div>
  );
};

export default Blog;
