import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #1c92d2, #f2fcfe)" }}
    >
      {/* Website Name */}
      <h1 className="text-white display-3 fw-bold">SafeHire</h1>
      {/* Updated Tagline */}
      <p className="text-white fs-4">Verify. Trust. Apply.</p>

      {/* Navigation Button */}
      <button
        className="btn btn-outline-light btn-lg mt-4"
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  );
}

export default HomePage;
