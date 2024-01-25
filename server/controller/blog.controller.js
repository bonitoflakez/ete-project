import mongoose from "mongoose";

import Blog from "../model/Blog.model.js";
import User from "../model/User.model.js";

const fetchAllBlogs = async (req, res) => {
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (e) {
    console.error(e);
  }

  if (!blogs) {
    return res.status(400).json({ message: "No blogs found" });
  }

  return res.status(200).json({ blogs });
};

const addBlog = async (req, res) => {
  const { title, description, img, content, user } = req.body;

  const currentDate = new Date();

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    return console.error(e);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unautorized" });
  }

  const blog = new Blog({
    title,
    description,
    img,
    content,
    user,
    date: currentDate,
  });

  try {
    await blog.save();
  } catch (e) {
    return console.error(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session);
    existingUser.blogs.push(blog);
    await existingUser.save(session);
    session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;
  const { title, description, content, img } = req.body;

  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      content,
      img,
    });
  } catch (e) {
    return console.error(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to update" });
  }

  return res.status(200).json({ blog });
};

const getById = async (req, res) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.error(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "not found" });
  }

  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id).populate("user");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const user = blog.user;
    user.blogs.pull(blog);
    await user.save();

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to delete" });
  }
};

const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
};

export { fetchAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId };
