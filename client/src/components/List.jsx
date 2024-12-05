import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router";

function List({ admin }) {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    
    try {
      
      const response = await axios.get("http://localhost:4000/");
      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-[90%] max-w-4xl bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <p className="text-3xl font-bold text-gray-800">Personal Blog</p>
        {admin && (
          <NavLink to="/create" className="text-xl text-blue-500 cursor-pointer hover:underline">
            + ADD
          </NavLink>
        )}
      </div>

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <NavLink to={`/blog/${blog.id}`}
            key={blog.id}
            className="flex justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            <span className="text-lg font-medium text-gray-700">{blog.title}</span>

            {admin ? (
              <div className="flex space-x-4">
                <NavLink className="text-blue-500 cursor-pointer hover:underline" to={`/edit/${blog.id}`}>Edit</NavLink>
                <span className="text-red-500 cursor-pointer hover:underline" onClick={async()=>{
                  try {
                    const response = await axios.delete(`http://localhost:4000/blog/${blog.id}`);
                    window.location.href = "/admin";
                    
                  } catch (error) {
                    console.log(error.message)
                  }
                }}>Delete</span>
              </div>
            ) : (
              <span className="text-sm text-gray-500">{blog.createdAt}</span>
            )}
          </NavLink>
        ))
      ) : (
        <p className="text-center text-gray-600">No blogs available.</p>
      )}
    </div>
  );
}

export default List;
