import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useMediaQuery } from "react-responsive";
import Profile from "../assets/images/Avatar-659652_640.webp";
import Logo from "../assets/images/logo.svg";
import "../assets/styles/global.css";
import "../assets/styles/Navbar.css";


const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ minWidth: 992 });

  const handleLogout = async () => {
    try {
      setUser(null);
      // Clear user-related data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("csrf_token");
      localStorage.removeItem("user");
  
      // Optionally, navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <nav className="navbar navbar-expand-lg mt-2">
      <div className={`container ${isDesktop ? "rounded-pill" : "rounded"}`}>
        <Link className="logo-head navbar-brand" to="/">
         <img
              src={Logo} // Replace with the actual profile image path
              alt="Profile"
              className="m-2 px-2"
              style={{ width: "100px", height: "30px", objectFit: "cover" }}
            />
        </Link>
        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible Section */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="montserrat-nav-font navbar-nav ms-auto mb-2 mb-lg-0">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  {/* Image for Larger Screens */}
                  <Link className="nav-link d-none d-lg-flex align-items-center" to="/dashboard">
                    <img
                      src={Profile} // Replace with the actual profile image path
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        border: ".8px solid grey"
                      }}
                    />
                  </Link>
                  {/* Text for Smaller Screens */}
                  <Link className="nav-link d-flex d-lg-none" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>


  );
};

export default Navbar;
