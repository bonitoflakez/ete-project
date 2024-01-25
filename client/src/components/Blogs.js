import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import BlogPost from "./BlogPost";
import { API_URL } from "../utils/API";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [showBlog, setShowBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const sendRequest = async () => {
    const res = await axios
      .get(`${API_URL}/blogs`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  const id = localStorage.getItem("userId");

  const showBlogPage = (blog) => {
    setSelectedBlog(blog);
    setShowBlog(true);
  }

  const goBackToBlogs = () => {
    setShowBlog(false);
  }

  return (
    <div className="mx-auto p-8">
      {showBlog ? (
        <div className="mx-80">
          <div>
            <button onClick={goBackToBlogs} className="border bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded-md mb-2">Go back to Blogs</button>
            <BlogPost
              id={selectedBlog._id}
              title={selectedBlog.title}
              imageURL={selectedBlog.img}
              content={selectedBlog.content}
              date={new Date(selectedBlog.date).toLocaleDateString()}
            />
          </div>
        </div>
      ) : (
        blogs && (
          <div className="grid grid-cols-4 gap-8">
            {blogs.map((blog, index) => (
              <Blog
                key={index}
                id={blog._id}
                isUser={localStorage.getItem("userId") === blog.user}
                title={blog.title}
                description={blog.description}
                content={blog.content}
                imageURL={blog.img}
                userName={blog._id}
                date={new Date(blog.date).toLocaleDateString()}
                loggedInUserId={id}
                onReadClick={() => showBlogPage(blog)}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Blogs;
