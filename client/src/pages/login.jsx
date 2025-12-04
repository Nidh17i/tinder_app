import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/authSlice";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(userLoggedIn(response.data.user));
      navigate("/feed");
      toast.success("User Login successfully!", {
        duration: 1000,
        position: "top-right",

        style: {
          background:
            "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
          color: "#fff",
          fontWeight: "bold",
        },
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed!";
      setError(msg);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetchData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white shadow-xl rounded-lg flex overflow-hidden max-w-2xl w-full">
        <div
          className="hidden md:flex flex-col justify-center items-center w-1/2 
                        bg-gradient-to-br from-purple-500 via-purple-400 to-orange-300 p-8 text-white"
        >
          <h1 className="text-3xl font-bold mb-1">Welcome</h1>
          <h1 className="text-3xl font-bold">Back!</h1>
        </div>

        <div className="w-full md:w-1/2 p-8">
          {error && (
            <p className="mb-3 text-red-700 bg-red-100 p-2 rounded">{error}</p>
          )}

          <h2 className="text-2xl font-semibold mb-2">Login</h2>
          <p className="text-gray-500 mb-4 text-sm">
            Welcome back! Please login.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                User Name
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-purple-400"
                placeholder="username@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 
                           focus:ring-purple-400"
                placeholder="***********"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-purple-500 text-white font-medium 
                         hover:bg-purple-600 transition"
            >
              Login
            </button>

            <p className="text-center text-sm mt-3">
              New User?{" "}
              <Link to="/signup" className="text-purple-600 underline">
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
