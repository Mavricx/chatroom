import React from "react";
import redirectTo from "../services/redirectTo";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <button
        className="w-full bg-black hover:bg-blue-600 text-white font-semibold py-4 md:py-5 px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/50 flex items-center justify-center gap-3 md:gap-4 text-base md:text-lg group"
        onClick={() => {
          redirectTo(import.meta.env.VITE_BACKEND_URL + "/auth/logout");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
