import axios from "axios";
import { useEffect, useState } from "react";
import image from "../assets/profileavtar.jpg";

export const SentRequests = () => {
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSent = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/sent", {
        withCredentials: true,
      });
      setSent(res.data.pending);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSent();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-3xl font-bold mb-8 text-purple-400">
          Sent Requests..
        </h1>

        {loading && (
          <div className="flex justify-center mt-20">
            <div className="w-5 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && sent.length === 0 && (
          <p className="text-center text-gray-400 text-lg">
            You haven't sent any requests.
          </p>
        )}

        {!loading &&
          sent.map((req) => (
            <div
              key={req._id}
              className="p-5 mb-5 bg-gray-800 border border-gray-700 
              rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-5"
            >
              <img
                src={image}
                alt="User Avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-purple-500"
              />

              <div className="flex-1">
                <p className="text-xl font-semibold text-white">
                  {req.receiverUser.username}
                </p>

                <p className="text-purple-300 text-sm">
                  {req.receiverUser.city}
                </p>

                <p
                  className="inline-block mt-3 px-3 py-1 text-sm font-semibold 
                text-yellow-400 bg-yellow-500/20 rounded-full border border-yellow-500/40"
                >
                  Request Pending
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
