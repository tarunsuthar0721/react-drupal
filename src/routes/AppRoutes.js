import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register"
import Home from "../pages/Home";
import ProtectedRoute from "../components/ProtectedRoute";


const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shop" element={<ProductList />} />
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
