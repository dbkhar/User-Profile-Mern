import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
   <div>

<div className="flex justify-center min-h-screen items-center">

  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 
                    text-white p-10 flex justify-between items-center
                    shadow-lg backdrop-blur-md rounded-2xl">
    <h1 className="text-3xl font-bold mb-4  text-center">
      Welcome Deep 
    </h1>
  </div>
   </div>
    

</div>

  );
}
export default Dashboard;
