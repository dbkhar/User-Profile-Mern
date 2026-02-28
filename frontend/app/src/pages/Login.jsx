import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center 
                    bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">

      <form
        onSubmit={handleLogin}
        className="backdrop-blur-lg bg-white/10 border border-white/20 
                   p-10 rounded-3xl shadow-2xl w-96 
                   text-white transition-all duration-500 hover:scale-105"
      >
        <h2 className="text-center font-bold text-3xl mb-8" style={{fontFamily:"DynaPuff"}}>
          Hi Deep !
        </h2>

        <div className="space-y-6">
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="w-full p-3 rounded-xl bg-white/20 
                       border border-white/30 
                       placeholder-white/70 
                       focus:outline-none focus:ring-2 focus:ring-white 
                       transition"
          />

          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="w-full p-3 rounded-xl bg-white/20 
                       border border-white/30 
                       placeholder-white/70 
                       focus:outline-none focus:ring-2 focus:ring-white 
                       transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-700 font-semibold py-3 rounded-xl 
                       hover:bg-gray-200 cursor-pointer transition duration-300 
                       hover:scale-105 active:scale-95"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

       </form>
    </div>
  );
}

export default Login;
