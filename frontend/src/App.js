import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import CheckJob from "./pages/CheckJob";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/check" element={<CheckJob />} />
      </Routes>
    </Router>
  );
}

export default App;
