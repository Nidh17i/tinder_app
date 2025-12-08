import axios from "axios";
import myImage from "../assets/avtarcard.svg";
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
                <h2 className="text-2xl font-bold">{curr.username}</h2>

                <p className="text-gray-400 text-sm mt-1">{curr.city}</p>

                <div className="mt-3">
                  <p className="text-xs text-gray-500 uppercase">Tech Stack</p>
                  <span
                    className="inline-block mt-1 bg-gray-700 text-purple-200 border
             border-gray-600 text-sm px-3 py-1 rounded-md"
                  >
                    {curr.Tech || "Not Provided"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
