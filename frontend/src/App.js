import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import CheckJob from "./pages/CheckJob";
import About from "./pages/About";
import Result from "./pages/Result";
import JobDescription from "./pages/JobDescription"; // ✅ Ensure this is imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/check" element={<CheckJob />} />
        <Route path="/result" element={<Result />} />
        <Route path="/job-description" element={<JobDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
