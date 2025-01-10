// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { getCategory } from "../services/Api"; 
import Profile from "../assets/images/Avatar-659652_640.webp";
import Logo from "../assets/images/logo.svg";
import "../assets/styles/global.css";
import "../assets/styles/Navbar.css";

const Navbar = ({categories }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleLogout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("csrf_token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg">
      <div className="container-fluid mx-1 mx-sm-2 mx-md-3 mx-lg-4 mx-xl-5">
        {/* Logo */}
        <Link className="logo-head navbar-brand" to="/">
          <img
            src={Logo}
            alt="Logo"
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
          <ul className="navbar-nav mx-auto d-flex align-items-center">
            <li className="nav-item mx-1">
              <Link className={`nav-link text-center ${isActive("/")}`} to="/">
                Home
              </Link>
            </li>

            <li className="nav-item mx-1">
              <Link className={`nav-link text-center ${isActive("/shop")}`} to="/shop">
                Shop
              </Link>
            </li>

            {/* Category Dropdown */}
            <li className="nav-item dropdown mx-1 dropdown-hover">
              <Link
                className="nav-link text-center dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </Link>
              <ul className="dropdown-menu">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link className="dropdown-item" to={category.url}>
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <span className="dropdown-item text-muted">No categories available</span>
                  </li>
                )}
              </ul>
            </li>

          </ul>

          <ul className="navbar-nav d-flex align-items-end">
            {!user ? (
              <>
                <li className="nav-item mx-auto">
                  <Link className={`nav-link text-center ${isActive("/login")}`} to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-auto">
                  <Link className={`nav-link text-center ${isActive("/register")}`} to="/register">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-auto">
                  <Link className="nav-link d-none d-lg-flex align-items-center" to="/dashboard">
                    <img
                      src={Profile}
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        border: ".8px solid grey",
                      }}
                    />
                  </Link>
                  <Link className={`nav-link d-flex d-lg-none ${isActive("/dashboard")}`} to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mx-auto">
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
