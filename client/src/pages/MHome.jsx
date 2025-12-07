import { Link } from "react-router-dom";
import image from "../assets/main.png";
export const MHome = () => {
  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col items-center text-white  space-y-6">
          <h1 className="text-6xl font-bold drop-shadow-lg ">
            Match skill Build ideas..
          </h1>
          <Link
            to="/signup"
            className="px-8 py-3 text-lg font-semibold rounded-full text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};
