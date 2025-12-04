import axios from "axios";
import myImage from "../assets/profileavtar.jpg";
import { useEffect, useState } from "react";
import { userFriend } from "../features/friendsSlice";
import { useDispatch, useSelector } from "react-redux";

export const AllNetwork = () => {
  const { friends } = useSelector((state) => state.friendSlice);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/friends", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      dispatch(userFriend(response.data.friend));
    } catch (err) {
      console.log(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-purple-400">
        Your Matches..
      </h1>

      {loading && (
        <div className="flex justify-center mt-20">
          <div className="w-5 h-10 border-2 border-purple-500 border-t-transparent rounded-md animate-spin"></div>
        </div>
      )}

      {!loading && (
        <div className="flex flex-wrap gap-10 justify-center">
          {friends.map((curr) => (
            <div
              key={curr._id}
              className="w-80 bg-gray-400 shadow-lg rounded-2xl overflow-hidden p-5 
              hover:scale-105 transition-all duration-300"
            >
              <img
                src={myImage}
                alt="Profile"
                className="w-full h-70 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">{curr.username}</h2>

                <p className="text-gray-800">
                  <span className="font-semibold text-black">City:</span>{" "}
                  {curr.city}
                </p>

                <p className="text-gray-800">
                  <span className="font-semibold text-black">Tech:</span>{" "}
                  {curr.Tech}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
