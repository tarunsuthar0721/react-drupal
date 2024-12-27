import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../assets/styles/Dashboard.css";


const Dashboard = () => {
  const { user, setUser } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile"); // State for active tab
 
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser) {
      navigate("/login");  
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div>
            <h2>Profile Information</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2>Settings</h2>
            <p>Here you can modify your settings.</p>
          </div>
        );
      case "notifications":
        return (
          <div>
            <h2>Notifications</h2>
            <p>View your notifications here.</p>
          </div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="dashboard-wrapper rounded">
      {/* Sidebar */}
      <div className="sidebar m-3 rounded">
        <div className="profile-section">
          <img
            src={user?.profile_picture}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <i className="fa-solid fa-user"></i>
              <span className="nav-text">Profile</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <i className="fa-solid fa-gear"></i>
              <span className="nav-text">Settings</span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "notifications" ? "active" : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <i className="fa-solid fa-bell"></i>
              <span className="nav-text">Notifications</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h1>Dashboard</h1>
        {user ? renderTabContent() : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Dashboard;
