import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    experience: "",
    projects: "",
  });

  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await api.get(`/profiles/${id}`);
    setForm(res.data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("bio", form.bio);
    formData.append("skills", form.skills);
    formData.append("experience", form.experience);
    formData.append("projects", form.projects);

    if (image) {
      formData.append("profileImage", image);
    }
    await api.put(`/profiles/${id}`, formData);
    setSuccess("Profile Updated");
    setTimeout(() => {
      navigate("/users");
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center -5">Update Your Profile</h2>
      <div className="flex justify-center items-center ">
        <form
          onSubmit={handleUpdate}
          className="bg-white p-8  border border-gray-300 rounded-2xl shadow-lg w-full max-w-md space-y-4"
        >
          <input
            value={form.name}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 rounded-xl border"
          />
          <input
            value={form.bio}
            placeholder="Bio"
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full p-2 rounded-xl border"
          />
          <input
            value={form.skills}
            placeholder="Skills"
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            className="w-full p-2 rounded-xl border"
          />
          <input
            value={form.experience}
            placeholder="Experience"
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="w-full p-2 rounded-xl border"
          />
          <input
            value={form.projects}
            placeholder="Project"
            onChange={(e) => setForm({ ...form, projects: e.target.value })}
            className="w-full p-2 rounded-xl border"
          />
          <input
            type="file"
            className="w-full p-2 rounded-xl border"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {success && (
            <p className="text-green-500 text-center text-sm font-bold">
              {success}
            </p>
          )}
          <div className="flex justify-center">
            <button
              className="group relative flex items-center justify-center gap-2 px-2 py-1 rounded-2xl 
                     bg-gradient-to-r from-red-500 to-pink-500 
                     hover:from-pink-500 hover:to-red-500 
                     text-white font-semibold text-lg
                     shadow-lg hover:shadow-red-500/50 
                     transition-all duration-300 hover:rotate-2 w-full   cursor-pointer
                     hover:scale-105 active:scale-95 disabled:opacity-70"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditProfile;
