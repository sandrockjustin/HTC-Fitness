import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import NavBar from "./NavBar.jsx";
import HomePage from "./HomePage.jsx";
import Goals from "./Goals.jsx";
import Routines from "./Routines.jsx";

const App = () => {
  return (
    <div className="app-view">
      <Router>
        <div className="router">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/routines" element={<Routines />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App