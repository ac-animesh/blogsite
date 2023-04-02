import { useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import axios from "../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
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
      const response = await axios.post("/api/auth/login", payload);
      console.log(response);
      const accessToken = response.data.accessToken;
      setAuth({ accessToken });
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };

  const toRegisterPage = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="p-8 bg-gray-900 flex flex-col justify-center items-center h-screen">
      <div className="">
        <form className="w-80" autoComplete="off" onSubmit={onSubmitHandler}>
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
            <div className="mb-8 flex flex-col">
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
              className="mb-4 w-full coursor-pointer text-white text-xl bg-green-600 border-2 border-green-600 px-4 py-1 rounded"
              type="submit"
            >
              Login
            </button>
            <hr />
            <div className="mt-2 text-center text-white">
              <h3>
                New here? {" "}
                <span
                  className="cursor-pointer text-green-500 hover:underline"
                  onClick={toRegisterPage}
                >
                  Create an account
                </span>
              </h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
