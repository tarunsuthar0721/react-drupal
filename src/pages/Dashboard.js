import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { updateUser } from "../services/Api";
import "../assets/styles/Dashboard.css";

const Dashboard = () => {
  const { user, setUser } = useAuth(); // Get user from context
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("profile"); // State for active tab
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    status: user?.status || "",
    roles: user?.roles || "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profile_picture: file, // Store the file in formData
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("uid", user?.uid);
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("profile_picture", formData.profile_picture);
  
      const response = await updateUser(formDataToSubmit);
      console.log("Update successful:", response);
  
      setUser((prevUser) => ({
        ...prevUser,
        name: formData.name,
        email: formData.email,
        profile_picture: response.data.profile_picture, // Update with the uploaded image URL
      }));
      setIsEditing(false);
    } catch (err) {
      console.error("Error during update:", err);
      setError("Update failed");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="profile-container">
            <h3 className="profile-title">Profile Information</h3>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status:</label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="roles">Role:</label>
                  <input
                    type="text"
                    id="roles"
                    name="roles"
                    value={formData.roles}
                    onChange={handleInputChange}
                    readOnly
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile_picture">Profile Picture:</label>
                  <input
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            ) : (
              <div className="profile-details">
                <p>
                  <strong>Uid:</strong> {user?.uid}
                </p>
                <p>
                  <strong>Name:</strong> {user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Status:</strong> {user?.status}
                </p>
                <p>
                  <strong>Role:</strong> {user?.roles}
                </p>
                <button onClick={handleEdit} className="btn btn-secondary edit-button">
                  Edit
                </button>
              </div>
            )}
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
              className={`nav-link ${activeTab === "notifications" ? "active" : ""
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
