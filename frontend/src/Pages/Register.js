import { useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import axios from "../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();

  const { name, email, password, confirm_password } = formData;

  const onChangeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password === confirm_password) {
      try {
        const payload = {
          name,
          email,
          password,
        };
        const result = await axios.post("/api/auth/register", payload);
        console.log(result.data);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
        });
      }
    } else {
      toast.error("Password is not Matching", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
    }
  };

  const toLoginPage = (e) => {
    e.preventDefault();
    navigate("/login");
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
            <h2 className="ml-2 text-white font-bold text-5xl">Register</h2>
          </div>
          {/* body */}
          <div className="">
            <div className="mb-2   flex flex-col">
              <label className="text-white text-xl mb-1">Name</label>
              <input
                className="p-2 rounded outline-none"
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={onChangeHandler}
                required
              />
            </div>
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
            <div className="mb-2   flex flex-col">
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
            <div className="mb-8 flex flex-col">
              <label className="text-white text-xl mb-1">
                Confirm Password
              </label>
              <input
                className="p-2 rounded outline-none"
                type="password"
                name="confirm_password"
                value={confirm_password}
                placeholder="Confirm password"
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
              Register
            </button>
            <hr />
            <div className="mt-2 text-center text-white">
              <h3>
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-green-500 hover:underline"
                  onClick={toLoginPage}
                >
                  Login
                </span>
              </h3>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
