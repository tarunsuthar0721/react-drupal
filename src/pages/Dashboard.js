import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { logoutUser } from "../services/Api";
// import '../assets/styles/Dashboard.css';

// Importing your image
import Image from "../assets/images/Profile.jpg"; // Replace with actual image path

const Dashboard = () => {
  const { user, setUser } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('profile'); // State for active tab

  useEffect(() => {
    // Check for token and user data in localStorage on component load
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Redirect to login if there's no token or user data
    if (!token || !storedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setUser(null); // Clear the user state
      // Clear user-related data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("csrf_token");
      localStorage.removeItem("user");

      // Navigate to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2>Profile Information</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2>Settings</h2>
            <p>Here you can modify your settings.</p>
          </div>
        );
      case 'notifications':
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
    <div className="dashboard-wrapper">
      <div className="d-flex">
        {/* Sidebar on the left */}
        <div className="bg-light p-3" style={{ width: '250px', height: '80vh' }}>
          <div className="d-flex align-items-center mb-4">
            <img
              src={Image}
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
            <h5>{user?.name}</h5>
          </div>
          
          {/* Sidebar Tabs */}
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                Settings
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </li>
          </ul>

          {/* Logout button */}
          <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
        </div>

        {/* Right side content */}
        <div className="container-fluid p-4" style={{ width: '100%' }}>
          <h1>Dashboard</h1>
          {user ? renderTabContent() : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
