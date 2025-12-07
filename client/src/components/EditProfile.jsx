import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { userLoggedIn } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
export default function EditProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authslice);
  console.log(user, "edit data");
  const naviagte = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    city: "",
    Tech: "",
    age: "",
    gender: "",
    state: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        username: user.username || "",
        email: user.email || "",
        city: user.city || "",
        Tech: user.Tech || "",
        age: user.age || "",
        gender: user.gender || "",
        state: user.state || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put("http://localhost:8080/users/profile", form, {
        withCredentials: true,
      });

      dispatch(userLoggedIn(res.data.user));
      toast.success("Profile updated!", {
        duration: 1000,
        position: "bottom-center",
      });
      naviagte("/profile");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-gray-800/40 p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700/40">
        <h2 className="text-3xl font-bold mb-8 text-center text-white tracking-wide">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm">First Name</label>
              <input
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Last Name</label>
              <input
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">State</label>
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm">Tech Stack</label>
            <input
              name="Tech"
              value={form.Tech}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg bg-gray-700/60 text-white border border-gray-600 focus:border-purple-500 focus:ring-purple-500 outline-none"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {message && (
            <p className="text-center text-purple-400 text-sm">{message}</p>
          )}

          <button className="w-full bg-purple-600 py-3 rounded-lg font-semibold text-white shadow-md hover:bg-purple-500 transition-all cursor-pointer">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
