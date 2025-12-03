import axios from "axios";
import myImage from "../assets/linkdeln.jpg";
import { useEffect } from "react";
import { userFriend } from "../features/friendsSlice";
import { useDispatch, useSelector } from "react-redux";

export const AllNetwork = () => {
  const { friends } = useSelector((state) => state.friendSlice);
  console.log(friends, "useSelctore");
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/friends", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(userFriend(response.data.friend));
      // console.log("friends", response.data.friend);
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
    <div>
      <div className="flex flex-wrap gap-4 justify-center mt-5 ">
        {friends.map((curr) => (
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
              <p className="text-gray-600 text-sm">{curr.city}</p>
              <p className="text-gray-700 text-sm mt-2">{curr.Tech}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
