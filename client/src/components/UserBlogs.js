import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { API_URL } from "../utils/API"; 

const UserBlogs = (visiting) => {
  const [user, setUser] = useState();

  const id = localStorage.getItem("userId");

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/blogs/user/${id}`
        );
        const data = await res.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    sendRequest().then((data) => setUser(data.user));
  }, [id]);

  return (
    <div className="mx-auto p-8">
      {user && (
        <div className="grid grid-cols-4 gap-8">
          {user.blogs.map((blog, index) => (
            <Blog
              key={index}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              content={blog.content}
              imageURL={blog.img}
              userName={blog.user}
              date={new Date(blog.date).toLocaleDateString()}
              visiting={visiting}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
