import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed for API requests
import Navbar from "./Navbar";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const location = useLocation();
  const pathname = location.pathname.split('/')[1]
  async function getBlogById(){
    const response = await axios.get(`http://localhost:4000/blog/${location.pathname.split('/')[2]}`);
    const blog = response.data;
    console.log(blog)
    setTitle(blog.title);
    setContent(blog.content);
  }
  useEffect(()=>{
    if(pathname=="edit"){
      getBlogById()
    }
  }, [])
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior

    const blogData = {
      title: title,
      content: content,
    };

    try {
      if(pathname==="create"){
        const response = await axios.post("http://localhost:4000/create", blogData,{
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        console.log("Blog submitted successfully:", response.data);
        setTitle("");
        setContent("");
        alert("Blog created successfully!");
      }
      else{
        const response = await axios.post(`http://localhost:4000/edit/${location.pathname.split('/')[2]}`, blogData,{
          headers: {
            Authorization: `Bearer ${token}`,  
          },
        });
        console.log("Blog edited successfully:", response.data);
        
      }
    } catch (error) {
      console.error("There was an error submitting the blog:", error);
      alert("Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="bg-slate-400 min-h-[100vh]">
      <Navbar admin={true}></Navbar>

      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{pathname=="create"?"Create a New":"Edit"} Blog</h2>

        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog title"
          />
        </div>

        {/* Content Input */}
        <div className="mb-6">
          <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog content here..."
            rows="6"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
