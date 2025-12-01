import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetchData();
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="#d4dfed rounded-2xl shadow-xl w-full max-w-md   bg-sky-100 p-8">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              FirstName
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInput}
              required
              className="w-full rounded-lg text-black px-4 py-2 "
              placeholder="Enter FirstName"
            />
            <label className="block text-gray-600 text-sm font-medium mb-1">
              LastName
            </label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInput}
              required
              className="w-full rounded-lg text-black px-4 py-2 "
              placeholder="Enter LastName"
            />
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInput}
              required
              className="w-full rounded-lg text-black px-4 py-2 "
              placeholder="Enter a unique username"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInput}
              className="w-full rounded-lg text-black px-4 py-2 "
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInput}
              className="w-full rounded-lg text-black px-4 py-2 "
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-black font-semibold py-2 rounded-lg transition"
          >
            Create Account
          </button>

          <p className="text-center text-gray-700 text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
