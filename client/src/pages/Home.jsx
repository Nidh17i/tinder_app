import axios from "axios";
import myImage from "../assets/avtarcard.svg";
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
            className="w-80 h-[520px] bg-gray-800 rounded-3xl overflow-hidden shadow-2xl 
             flex flex-col border border-gray-700"
          >
            <div className="h-[70%] w-full flex justify-center items-center px-4 pt-4">
              <div className="w-full h-full rounded-xl overflow-hidden shadow-md bg-gray-700">
                <img
                  src={myImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="h-[30%] px-5 py-4 text-white bg-gray-900">
              <h2 className="text-2xl font-bold">{currentUser.username}</h2>

              <p className="text-gray-400 text-sm mt-1">{currentUser.city}</p>

              <div className="mt-3">
                <p className="text-xs text-gray-500 uppercase">Tech Stack</p>
                <span
                  className="inline-block mt-1 bg-gray-700 text-purple-200 border
                       border-gray-600 text-sm px-3 py-1 rounded-md"
                >
                  {currentUser.Tech || "Not Provided"}
                </span>
              </div>
            </div>

            <div className="h-[10%] bg-gray-900 flex items-center justify-center gap-5 pb-3">
              <button
                onClick={() => handleAction(currentUser._id, "ignored")}
                className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold
               shadow-lg hover:bg-red-600 hover:scale-105 transition cursor-pointer"
              >
                Reject
              </button>

              <button
                onClick={() => handleAction(currentUser._id, "interested")}
                className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold
               shadow-lg hover:bg-green-600 hover:scale-105 transition cursor-pointer"
              >
                Interested
              </button>
            </div>
          </div>
        ) : (
          <p className="text-white text-xl">No more users</p>
        )}
      </div>
    </div>
  );
};
