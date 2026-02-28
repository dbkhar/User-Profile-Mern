import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function UserCard({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const skillsArray = Array.isArray(user.skills)
    ? user.skills
    : user.skills?.split(",") || [];

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/profiles/${user._id}`);

      setTimeout(() => {
        navigate("/create");
      }, 2000);
    } catch (error) {
      console.log(error);
      alert("somthing went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div
        className="bg-white/10 backdrop-blur-xl border border-gray-400 
                    rounded-2xl shadow-xl p-6 
                    transition-all duration-500 
                    hover:scale-105 hover:shadow-blue-500"
      >
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/uploads/${user.profileImage}`}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover 
                     border-2 border-blue-500 shadow-md"
          />
        </div>

        {/* Name */}
        <h3 className="text-2xl font-semibold text-center mt-4 text-gray-400">
          {user.name}
        </h3>

        {/* Bio */}
        <p className=" text-sm text-center mt-2 px-2">{user.bio}</p>

        {/* Experience */}
        <div className="mt-4">
          <p className="text-blue-400 font-medium">Experience:</p>
          <p className="text-gray-400 text-sm">{user.experience}</p>
        </div>

        {/* Projects */}
        <div className="mt-3">
          <p className="text-blue-400 font-medium">Projects:</p>
          <p className="text-gray-400 text-sm">{user.projects}</p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4">
          {skillsArray.map((skill, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-500 to-indigo-500
                       text-white px-3 py-1 rounded-full text-sm
                       shadow-md hover:scale-110 transition duration-500"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex gap-4 justify-between mt-10">
          <button
            className="group relative flex items-center justify-center gap-2 px-2 py-1 rounded-2xl
                     bg-gradient-to-r from-red-500 to-pink-500 
                     hover:from-pink-500 hover:to-red-500 
                     text-white font-semibold text-lg
                     shadow-lg hover:shadow-red-500/50 
                     transition-all duration-300 hover:rotate-6   cursor-pointer
                     hover:scale-105 active:scale-95 disabled:opacity-70"
            onClick={() => navigate(`/edit-profile/${user._id}`)}
          >
            Edit Profile
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="group relative flex items-center justify-center gap-2 px-2 py-1 rounded-2xl
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
                Deleting...
              </>
            ) : (
              "Delete Profile"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
