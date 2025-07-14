import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import Providers from "../contexts";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import RecipeBook from "../pages/RecipeBook";
import ShoppingList from "../pages/ShoppingList";

import "../App.css";

function AppRouter() {
  return (
    <Providers>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <div className="App" style={{ paddingTop: "64px" }}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/recipe-book" element={<RecipeBook />} />
                <Route path="/shopping-list" element={<ShoppingList />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </Providers>
  );
}

export default AppRouter;
