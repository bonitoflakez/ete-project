import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/API";

const AddBlogs = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    content: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(`${API_URL}/blogs/add`, {
        title: inputs.title,
        description: inputs.description,
        img: inputs.imageURL,
        content: inputs.content,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        console.log(data);
        window.location.href = "/myBlogs";
      })
      .then(() => navigate("/blogs"));
  };
  return (
    <div className="mx-80 rounded-md mt-3">
      <form onSubmit={handleSubmit}>
        <div className="rounded-md p-4 mt-3 flex flex-col justify-center items-center w-full">
          <h3 className="text-3xl text-center font-semibold">
            Write a new story
          </h3>
          <div className="w-[60%]">
            <h3 className="text-xl font-semibold mt-2">Title</h3>
            <input
              type="text"
              placeholder="Enter title of your blog"
              className="border w-full rounded-md p-2 outline-none"
              name="title"
              onChange={handleChange}
              value={inputs.title}
            />
          </div>
          <div className="w-[60%]">
            <h3 className="text-xl font-semibold mt-2">Description</h3>
            <textarea
              placeholder="Description for blog post"
              className="border w-full rounded-md p-2 outline-none"
              name="description"
              onChange={handleChange}
              rows={2}
              value={inputs.description}
            />
          </div>
          <div className="w-[60%]">
            <h3 className="text-xl font-semibold mt-2">Content</h3>
            <textarea
              placeholder="Content for blog post"
              className="border w-full rounded-md p-2 outline-none"
              name="content"
              onChange={handleChange}
              rows={4}
              value={inputs.content}
            />
          </div>
          <div className="w-[60%]">
            <h3 className="text-xl font-semibold mt-2">Image URL</h3>
            <input
              type="text"
              placeholder="Enter image URL for your blog post banner"
              className="border w-full rounded-md p-2 outline-none"
              name="imageURL"
              onChange={handleChange}
              value={inputs.imageURL}
            />
          </div>
          <button
            className="px-2 py-1 rounded-md font-medium bg-blue-600 text-white mt-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;
