import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetail from "../pages/ProductDetails";
import { getCategory } from "../services/Api"; // Import your API call
import "../assets/styles/Custom.css";

const AppRoutes = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Navbar categories={categories} />
      <div className="container-fluid main-cls">
        <Routes>
          <Route path="/" element={<Home categories={categories} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/product/:title" element={<ProductDetail />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
