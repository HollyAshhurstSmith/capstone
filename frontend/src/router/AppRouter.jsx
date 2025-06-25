import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/RecipeBook";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RecipeBook from "../pages/RecipeBook";
import ShoppingList from "../pages/ShoppingList"; // placeholder
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="App" style={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route
            path="/recipe-book"
            element={
              <ProtectedRoute>
                <RecipeBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping-list"
            element={
              <ProtectedRoute>
                <ShoppingList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;


