import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                    text-white p-4 flex justify-between items-center
                    shadow-lg backdrop-blur-md"
    >
      <h2
        className="font-bold text-xl cursor-pointer hover:scale-105 transition duration-300"
        onClick={() => navigate("/dashboard")}
      >
        Navbar
      </h2>

      <div className="flex gap-6 items-center text-sm font-semibold">
        <button
          onClick={() => navigate("/create")}
          className="hover:text-yellow-400 cursor-pointer transition duration-300 hover:scale-105"
        >
          CREATE PROFILE
        </button>

        <button
          onClick={() => navigate("/users")}
          className="hover:text-yellow-400 transition cursor-pointer duration-300 hover:scale-105"
        >
          ALL USERS
        </button>

        <Link
          to="/LogOut"
          className="bg-red-500 px-4 py-1 rounded-lg 
                     hover:bg-red-600 transition duration-300 
                     hover:scale-105"
        >
          LOG OUT
        </Link>
        
      </div>
    </div>
  );
}

export default Navbar;
