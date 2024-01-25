import React from "react";
import axios from "axios";
import { API_URL } from "../utils/API";

const DeleteButton = ({ blogId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/blogs/${blogId}`);
      onDelete();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteButton;
