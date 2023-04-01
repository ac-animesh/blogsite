import React, { useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email,
        password,
      };
      const result = await axios.post("/api/auth/login", payload);
      console.log(result.data);

      localStorage.setItem("token", JSON.stringify(result.data.accessToken));

      setFormData({
        email: "",
        password: "",
      });
      toast.success(result.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };

  return (
    <div className="p-8 bg-gray-900 flex flex-col justify-center items-center h-screen">
      <div className="">
        <form className="w-96" autoComplete="off" onSubmit={onSubmitHandler}>
          {/* heading */}
          <div className="mb-2 flex flex-row justify-center items-center">
            <PersonRoundedIcon
              style={{
                fontSize: "5rem",
                color: "white",
              }}
            />
            <h2 className="ml-2 text-white font-bold text-5xl">Login</h2>
          </div>
          {/* body */}
          <div className="">
            <div className="mb-2   flex flex-col">
              <label className="text-white text-xl mb-1">Email</label>
              <input
                className="p-2 rounded outline-none"
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="mb-4   flex flex-col">
              <label className="text-white text-xl mb-1">Password</label>
              <input
                className="p-2 rounded outline-none"
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChangeHandler}
                required
              />
            </div>
          </div>
          {/* footer */}
          <div className="">
            <button
              className="coursor-pointer text-white text-xl bg-green-600 hover:bg-green-400:border:bg-green-400 border border-green-600 px-4 py-1 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
