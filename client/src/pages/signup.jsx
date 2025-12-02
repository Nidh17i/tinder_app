import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userLoggedIn } from "../features/authSlice";

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
    console.log(name);
    console.log(value);
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
          withCredentials: true,
        }
      );
      dispatch(userLoggedIn(response.data.user));
      window.alert("user signupsucessfully");
      //console.log("Response:", response.data);
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
    console.log(formData);
    fetchData();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="border w-full px-3 py-2 rounded"
              value={formData.firstname}
              onChange={handleInput}
              required
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="border w-full px-3 py-2 rounded"
              value={formData.lastname}
              onChange={handleInput}
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border w-full px-3 py-2 rounded"
            value={formData.username}
            onChange={handleInput}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border w-full px-3 py-2 rounded"
            value={formData.email}
            onChange={handleInput}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border w-full px-3 py-2 rounded"
            value={formData.password}
            onChange={handleInput}
            required
          />

          <button
            type="submit"
            className="w-full border py-2 rounded font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
