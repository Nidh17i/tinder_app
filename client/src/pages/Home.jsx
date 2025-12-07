import axios from "axios";
import myImage from "../assets/profileavtar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { friendList } from "../features/feedSlice";
import { useEffect, useState } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  const { feeduser } = useSelector((state) => state.feedSlice);

  const [currUser, setCurruser] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/users/feed", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      dispatch(friendList(response.data.feed));
      setCurruser(0);
      setLoading(false);
    } catch (err) {
      console.log(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAction = async (receiverId, action) => {
    try {
      await axios.post(
        `http://localhost:8080/user/action/${receiverId}/${action}`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const updatedFeed = feeduser.filter((user) => user._id !== receiverId);
      dispatch(friendList(updatedFeed));
      setCurruser((prev) => prev + 1);
    } catch (err) {
      console.log(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message
      );
    }
  };

  const currentUser = feeduser[currUser];

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-purple-400">
        TechMate Users..
      </h1>

      <div className="flex justify-center">
        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="w-5 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : currentUser ? (
          <div
            key={currentUser._id}
            className="w-80 bg-gray-400 shadow-lg rounded-2xl overflow-hidden p-5"
          >
            <img
              src={myImage}
              alt="Profile"
              className="w-full h-70 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold">{currentUser.username}</h2>

              <p className="text-gray-800">
                <span className="font-semibold text-black">City:</span>{" "}
                {currentUser.city}
              </p>

              <p className="text-gray-800">
                <span className="font-semibold text-black">Tech:</span>{" "}
                {currentUser.Tech}
              </p>

              <div className="flex items-center justify-between mt-5">
                <button
                  className="w-28 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition text-sm cursor-pointer"
                  onClick={() => handleAction(currentUser._id, "interested")}
                >
                  Interested
                </button>

                <button
                  className="w-28 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition text-sm cursor-pointer"
                  onClick={() => handleAction(currentUser._id, "ignored")}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white text-xl">No more users</p>
        )}
      </div>
    </div>
  );
};
