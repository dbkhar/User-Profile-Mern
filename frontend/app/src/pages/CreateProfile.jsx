import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";
function CreateProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    bio: "",
    skills: "",
    experience: "",
    projects: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.bio ||
      !form.skills ||
      !form.experience ||
      !form.projects ||
      !image
    ) {
      setError("Enter all fields ");
      return;
    }
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("bio", form.bio);
    formData.append("skills", form.skills);
    formData.append("experience", form.experience);
    formData.append("projects", form.projects);
    formData.append("profileImage", image);

    try {
      setLoading(true);
      await api.post("http://localhost:5000/api/profiles", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCreated("Profile Saved");
      setTimeout(() => {
        navigate("/users");
         
      }, 1500);
    } catch (error) {
      console.log(error.response?.data);
      setError("Somthing went Wrong");
      setLoading(false);
    }
  };
  return (
    <div>
     
      <div className="p-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4"
        >
          <h2 className="text-center">Create Your Profile</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            className="w-full p-2 rounded-xl border"
          />
          <input
            name="bio"
            placeholder="Enter Bio"
            onChange={handleChange}
            value={form.bio}
            className="w-full p-2 rounded-xl border"
          />
          <input
            name="skills"
            placeholder="Enter Skills"
            onChange={handleChange}
            value={form.skills}
            className="w-full p-2 rounded-xl border"
          />
          <input
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            value={form.experience}
            className="w-full p-2 rounded-xl border"
          />
          <input
            name="projects"
            placeholder="Projects"
            onChange={handleChange}
            value={form.projects}
            className="w-full p-2 rounded-xl border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 rounded-xl border"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {created && (
            <p className="text-center text-green-500 text-sm">{created}</p>
          )}
          <button
            disabled={loading}
            className="w-full py-2 rounded-xl font-semibold  bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-700 to-purple-600 duration-500 cursor-pointer text-white"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateProfile;
