
import axios from "axios";
import myImage from '../assets/linkdeln.jpg';
import { useDispatch, useSelector } from "react-redux";
import { friendList } from "../features/feedSlice";
import { useEffect } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { feeduser } = useSelector((state) => state.feedSlice);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/feed", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      dispatch(friendList(response.data.feed));
      
    } catch (err) {
      console.log(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message
      );
    }
  };
 
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    
  
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {feeduser.map((curr) => (
          <div 
            key={curr._id}
            className="w-80 bg-white shadow-lg rounded-2xl overflow-hidden p-5"
          >
            <img
              src={myImage}
              alt="Profile"
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">{curr.name}</h2>
              <p className="text-gray-600 text-sm">Mumbai, India</p>
              <p className="text-gray-700 text-sm mt-2">
                Tech: React, Node, DevOps
              </p>

              <div className="flex items-center justify-between mt-5">
                <button className="w-28 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-sm">
                  Interested
                </button>

                <button className="w-28 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

