import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/authSlice";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
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
      window.alert("user login sucessfully");

      // console.log("Response:", response.data.user);
    } catch (err) {
      console.log(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    console.log(formData);
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
      <div className="w-full max-w-md border p-6 rounded-lg bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border w-full px-3 py-2 rounded"
              placeholder="user@example.com"
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
              className="border w-full px-3 py-2 rounded"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full border py-2 rounded font-medium"
          >
            Login
          </button>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );

  
}

