import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import AllUser from "./pages/AllUser";
import LogOut from "./pages/LogOut";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Dashboard />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Navbar />
                <CreateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Navbar />
                <AllUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/LogOut"
            element={
              <ProtectedRoute>
                <Navbar />
                <LogOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <EditProfile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
