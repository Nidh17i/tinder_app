import { Link } from "react-router-dom";
import image from "../assets/TinderBackgroundImage.jpeg";
export const MHome = () => {
  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center t
        
        
         space-y-6">
          <h1 className="text-6xl font-bold drop-shadow-lg ">
            Start something epic..
          </h1>

          <Link
            to="/signup"
            className="bg-red-500 hover:bg-red-600 px-10 py-3 rounded-full
    font-semibold text-lg shadow-xl transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};
