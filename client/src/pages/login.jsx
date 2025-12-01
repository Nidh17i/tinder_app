import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
    const[formData,setFormData]=useState({
        email:"",
        password:""
    })
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="#d4dfed rounded-2xl shadow-xl w-full max-w-md   bg-sky-100 p-8">
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}className="space-y-5">
          <div>
           
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
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
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg text-black px-4 py-2 "
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400 text-black font-semibold py-2 rounded-lg transition"
          >
          Login
          </button>
          <p className="text-center text-gray-800 text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">Sign Up</Link>
        </p>
        </form>
      </div>
    </div>
  );
};
