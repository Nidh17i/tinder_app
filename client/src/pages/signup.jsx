import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/authSlice";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    city: "",
    Tech: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      dispatch(userLoggedIn(response.data.user));                                                                       
      toast.success("User signed up successfully!", {
        duration: 1000,
        position: "top-right",

        style: {
          background:
            "linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      navigate("/feed");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Signup failed!";
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
                        bg-gradient-to-br from-purple-500 via-purple-400 to-orange-300 p-10 text-white"
        >
          <h1 className="text-3xl font-bold mb-1">Create</h1>
          <h1 className="text-3xl font-bold">Account</h1>
        </div>

        <div className="w-full md:w-1/2 p-8">
          {error && (
            <p className="mb-3 text-red-700 bg-red-100 p-2 rounded">{error}</p>
          )}

          <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-4 text-sm">Let’s get you started.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                  className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                  className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Tech Stack</label>
                <input
                  type="text"
                  name="Tech"
                  value={formData.Tech}
                  onChange={handleChange}
                  required
                  className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="border w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>

            
       <div className="relative">
  <label className="text-sm font-medium">Password</label>

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    className="border w-full px-3 py-2 rounded-lg 
               focus:ring-2 focus:ring-purple-400 
               pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
  >
    {showPassword ? (
      <EyeSlashIcon className="h-5 w-5" />
    ) : (
      <EyeIcon className="h-5 w-5" />
    )}
  </button>
</div>



            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-purple-500 text-white font-medium 
                         hover:bg-purple-600 transition"
            >
              Sign Up
            </button>

            <p className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
