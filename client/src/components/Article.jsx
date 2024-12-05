import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Article() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token")
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/blog/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="text-gray-600 text-lg font-semibold">Loading blog...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar admin={token?true:false}></Navbar>

      <div className="py-10 px-4 flex justify-center">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-6">
              Published on {new Date(blog.createdAt).toLocaleDateString()} | Author:{" "}
              <span className="text-gray-700 font-semibold">{blog.author || "Unknown"}</span>
            </p>

            <div className="prose prose-lg max-w-none text-gray-700">{blog.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
