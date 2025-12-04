import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import image from "../assets/profileavtar.jpg";

export const Profile = () => {
  const { user } = useSelector((state) => state.authslice);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center py-10 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={image}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-gray-900 rounded-full"></span>
          </div>

          <h1 className="text-3xl font-semibold text-white mt-4 tracking-wide">
            {user?.username || "Unknown User"}
          </h1>

          <p className="text-purple-300 text-sm">
            {user?.city || "No city added"}
          </p>

          <div className="mt-3 px-4 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm border border-purple-500/40">
            {user?.Tech || "Tech Stack Not Added"}
          </div>
        </div>

        <div className="mt-8 h-px bg-gray-600/40"></div>

        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <p className="text-gray-300 text-sm">
              <span className="font-semibold text-white">Email:</span>{" "}
              {user?.email}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/edit-profile"
            className="px-6 py-2 font-bold text-white rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
