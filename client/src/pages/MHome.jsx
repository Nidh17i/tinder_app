import { Link } from "react-router-dom";
import image from "../assets/main.png";

export const MHome = () => {
  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center text-white space-y-6 px-4">
       <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
  Match Skill Build Ideas...
</h1>


          <Link
            to="/signup"
            className="px-8 py-3 text-lg font-semibold rounded-full text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background:
                "linear-gradient(90deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
            }}
          >
            Create Account
          </Link>
        </div>
      </div>
    </>
  );
};
