import axios from "axios";
import { useEffect, useState } from "react";

export const SentRequests = () => {
  const [sent, setSent] = useState([]);

  const fetchSent = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/sent", {
        withCredentials: true,
      });
      setSent(res.data.pending);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchSent();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sent Requests (Interested)</h1>

      {sent.length === 0 ? (
        <p>You haven't sent any requests.</p>
      ) : (
        sent.map((req) => (
          <div key={req._id} className="p-4 border rounded mb-3">
            <p className="font-semibold text-lg">
              {req.receiverUser.name}
            </p>
            <p className="text-gray-600">{req.receiverUser.city}</p>

            <p className="text-yellow-600 text-sm mt-2 font-semibold">
              Status: Pending
            </p>
          </div>
        ))
      )}
    </div>
  );
};
