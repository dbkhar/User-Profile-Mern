import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LogOut() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen ">

      <div className="flex justify-center items-center h-[80vh]">
        <button
          onClick={handleLogout}
          disabled={loading}
          className="group relative flex items-center justify-center gap-2 px-8 py-3 rounded-2xl 
                     bg-gradient-to-r from-red-500 to-pink-500 
                     hover:from-pink-500 hover:to-red-500 
                     text-white font-semibold text-lg
                     shadow-lg hover:shadow-red-500/50 
                     transition-all duration-300 hover:rotate-6   cursor-pointer
                     hover:scale-105 active:scale-95 disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Logging out...
            </>
          ) : (
            "Log Out"
          )}
        </button>
      </div>
    </div>
  );
}

export default LogOut;
