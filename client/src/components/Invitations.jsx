import axios from "axios";
import { useEffect, useState } from "react";

export const IncomingInvitations = () => {
  const [incoming, setIncoming] = useState([]);

  const fetchIncoming = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/users/request",
        { withCredentials: true }
      );
      setIncoming(response.data.request);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchIncoming();
  }, []);

  // Accept Request
  const handleAccept = async (senderId) => {
    try {
      await axios.post(
        `http://localhost:8080/user/accept/${senderId}`,
        {},
        { withCredentials: true }
      );

      setIncoming(incoming.filter(r => r.senderUser._id !== senderId));
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  // Reject Request
  const handleReject = async (senderId) => {
    try {
      await axios.post(
        `http://localhost:8080/user/reject/${senderId}`,
        {},
        { withCredentials: true }
      );

      setIncoming(incoming.filter(r => r.senderUser._id !== senderId));
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-5">Incoming Invitations</h1>

      {incoming.length === 0 ? (
        <p>No Incoming Requests</p>
      ) : (
        incoming.map((req) => (
          <div
            key={req._id}
            className="p-4 border rounded mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{req.senderUser.username}</p>
              <p className="text-gray-600">{req.senderUser.city}</p>
              <p className="text-gray-600">{req.senderUser.Tech}</p>
              
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(req.senderUser._id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Accept
              </button>

              <button
                onClick={() => handleReject(req.senderUser._id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
