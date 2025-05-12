import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <div className="App" style={{ paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
