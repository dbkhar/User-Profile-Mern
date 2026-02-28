import React, { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";

function AllUsers() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get(`/profiles?search=${search}`);
        setProfiles(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfiles();
  }, [search]);

  return (
    <div>
    

      {/* 🔎 Search Input */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 py-1 border rounded-lg w-1/3 shadow-md"
        />
      </div>

      <div className="p-10 grid grid-cols-3 gap-6">
        {profiles.length > 0 ? (
          profiles.map((user) => (
            <UserCard key={user._id} user={user} />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No users found
          </p>
        )}
      </div>
    </div>
  );
}

export default AllUsers;
