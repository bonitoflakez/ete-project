import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/API";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const loginSignupToggle = () => {
    setIsLogin(!isLogin);
  };

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type) => {
    const res = await axios
      .post(`${API_URL}/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const result = await res;
    const data = result.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      console.log("signup");
      sendRequest("signup").then((data) => {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userName", data.user.name);

        window.location.href = "/";
      });
    } else {
      console.log("login");
      sendRequest("login").then((data) => {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userName", data.user.name);

        window.location.href = "/";
      });
    }
  };

  return (
    <div className="mx-[30rem] border rounded-md mt-3 flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <div className="rounded-md p-4 mt-3 flex flex-col justify-center items-center w-full">
          <h2 className="text-center text-2xl font-semibold">
            {!isLogin ? "Signup" : "Login"}
          </h2>
          {!isLogin && (
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              className="p-2 border rounded-md mt-2 outline-none min-w-72"
            />
          )}
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            placeholder="Email"
            className="p-2 border rounded-md mt-2 outline-none min-w-72"
          />
          <input
            name="password"
            className="p-2 border rounded-md mt-2 outline-none min-w-72"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium mt-4"
          >
            Submit
          </button>
        </div>
      </form>
      <button
        onClick={loginSignupToggle}
        className="px-4 py-2 rounded-md border mt-4 justify-self-center max-w-48 my-4"
      >
        Change To {!isLogin ? "Login" : "Signup"}
      </button>
    </div>
  );
};

export default Login;
