import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/API";

const Blog = ({
  title,
  description,
  imageURL,
  content,
  userName,
  isUser,
  id,
  date,
  onReadClick,
  visiting
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${API_URL}/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="my-4 bg-gray-200 rounded-md m-auto min-w-96">
      <div className="w-full rounded-md">
        <div className="mx-6 my-2 flex items-center">
          <p className="text-xl font-medium">{title}</p>
        </div>

        <div className="px-4 py-2">
          <span className="text-md">
            <div className="flex items-center">
              <p className="text-sm font-semibold">{userName}</p>
              {date && <p className="text-sm ml-auto font-semibold my-1">{date}</p>}
            </div>

            <div className="rounded-md pb-2">
              <p className="text-sm w-72 overflow-hidden text-ellipsis font-normal" style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3
              }}>
                {description}
              </p>
            </div>

            <div className="flex items-center">
              {isUser && (
                <div className="flex items-center mr-4 my-2 gap-2">
                  <button
                    className="font-medium px-2 py-1 rounded-md bg-green-500 text-white"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium px-2 py-1 rounded-md bg-red-500 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
              {!visiting && (
                <div className="ml-auto">
                  <button className="border px-4 py-1 bg-gray-300 rounded-md" onClick={onReadClick}>
                    Read
                  </button>
                </div>
              )}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Blog;
