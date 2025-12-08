import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const IncomingInvitations = () => {
  const [incoming, setIncoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIncoming = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users/request", {
        withCredentials: true,
      });

      setIncoming(response.data.request);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);

      toast.error("Failed to load requests!", {
        style: { background: "#DC2626", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncoming();
  }, []);

  const handleAccept = async (senderId) => {
    try {
      await axios.post(
        `http://localhost:8080/user/accept/${senderId}`,
        {},
        { withCredentials: true }
      );

      setIncoming(incoming.filter((r) => r.senderUser._id !== senderId));

      toast.success("Request Accepted!", {
        style: { background: "#4CAF50", color: "#fff" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error accepting request", {
        style: { background: "#DC2626", color: "#fff" },
      });
    }
  };

  const handleReject = async (senderId) => {
    try {
      await axios.post(
        `http://localhost:8080/user/reject/${senderId}`,
        {},
        { withCredentials: true }
      );

      setIncoming(incoming.filter((r) => r.senderUser._id !== senderId));

      toast.success("Request Rejected!", {
        style: { background: "#4B5563", color: "#fff" },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error rejecting request", {
        style: { background: "#DC2626", color: "#fff" },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="text-center text-3xl font-bold mb-8 text-purple-400">
          Incoming Invitations...
        </h1>

        {loading && (
          <div className="flex justify-center mt-20">
            <div className="w-5 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && incoming.length === 0 && (
          <p className="text-center text-gray-300 text-lg mt-10">
            No Incoming Requests
          </p>
        )}

        {!loading &&
          incoming.map((req) => (
            <div
              key={req._id}
              className="p-5 mb-5 bg-gray-800 border border-gray-700 
              rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-semibold text-white">
                    {req.senderUser.username}
                  </p>
                  <p className="text-purple-300 text-sm">
                    {req.senderUser.city}
                  </p>
                  <p className="text-gray-400 text-sm">{req.senderUser.Tech}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAccept(req.senderUser._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(req.senderUser._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
