import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import React from "react";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import AddBlogs from "./components/AddBlogs";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route index element={<Blogs />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/myBlogs" element={<UserBlogs visiting={true} />}></Route>
          <Route path="/myBlogs/:id" element={<BlogDetail />}></Route>
          <Route path="/blogs/add" element={<AddBlogs />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
