import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../utils/API";

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}`);
      const data = res.data;
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        content: data.blog.content,
        img: data.blog.img,
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const sendRequest = async () => {
    const res = await axios
      .put(`${API_URL}/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        content: inputs.content,
        img: inputs.img,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit} className="flex justify-center mt-2">
          <div className="rounded-md p-4 w-[60%] flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold">Edit blog</h2>
            <h4 className="text-md font-medium">Blog ID: [ {id} ]</h4>
            <div className="w-full">
              <h3 className="font-medium text-xl">Title</h3>
              <input
                type="text"
                name="title"
                className="p-2 rounded-md w-full border outline-none"
                onChange={handleChange}
                value={inputs.title}
              />
            </div>
            <div className="w-full">
              <h3 className="font-medium text-xl">Description</h3>
              <textarea
                name="description"
                onChange={handleChange}
                value={inputs.description}
                className="border rounded-md p-2 w-full outline-none"
                rows={4}
              ></textarea>
            </div>
            <div className="w-full">
              <h3 className="font-medium text-xl">Content</h3>
              <textarea
                name="content"
                onChange={handleChange}
                value={inputs.content}
                className="border rounded-md p-2 w-full outline-none"
                rows={6}
              ></textarea>
            </div>
            <div className="w-full">
              <h3 className="font-medium text-xl">img</h3>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={inputs.img}
                className="border rounded-md p-2 w-full outline-none"
              ></input>
            </div>

            <button
              className="bg-blue-600 px-2 py-1 text-white rounded-md mt-2"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
