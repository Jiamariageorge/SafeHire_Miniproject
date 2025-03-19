import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const fullTitle = "SafeHire";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTitle(fullTitle.slice(0, i + 1));
      i++;
      if (i === fullTitle.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #141e30, #243b55)",
        overflow: "hidden",
      }}
    >
      <div className="container d-flex align-items-center justify-content-between w-75">
        {/* Left Section - Title & Button */}
        <div className="text-light">
          <h1 className="display-2 fw-bold title-animation">{title}</h1>
          <p className="fs-3 tagline-animation">Verify. Trust. Apply.</p>
          <button
            className="btn btn-outline-light btn-lg mt-3 button-animation"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>

        {/* Right Section - Animated Shield */}
        <div className="position-relative shield-container">
          <FaShieldAlt className="shield-icon" />
          <div className="scanning-line"></div>
          <div className="shield-glow"></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .title-animation {
            animation: fadeIn 1s ease-out;
            letter-spacing: 3px;
          }

          .tagline-animation {
            opacity: 0;
            animation: fadeIn 1.5s ease-in-out 0.5s forwards;
          }

          .shield-container {
            width: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .shield-icon {
            font-size: 250px;
            color: #00e1ff;
            animation: rotateShield 8s infinite linear, glowEffect 2s infinite alternate;
            filter: drop-shadow(0 0 20px rgba(0, 225, 255, 0.9));
          }

          @keyframes rotateShield {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }

          @keyframes glowEffect {
            0% { filter: drop-shadow(0 0 15px rgba(0, 225, 255, 0.6)); }
            100% { filter: drop-shadow(0 0 25px rgba(0, 225, 255, 1)); }
          }

          .scanning-line {
            width: 190px;
            height: 6px;
            background: rgba(0, 225, 255, 0.7);
            position: absolute;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            animation: scanEffect 3s infinite alternate;
          }

          @keyframes scanEffect {
            0% { top: 10%; opacity: 1; }
            100% { top: 90%; opacity: 0.2; }
          }

          .shield-glow {
            position: absolute;
            width: 270px;
            height: 270px;
            background: rgba(0, 225, 255, 0.2);
            border-radius: 50%;
            filter: blur(40px);
            animation: pulseGlow 2s infinite alternate;
          }

          @keyframes pulseGlow {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.2); opacity: 1; }
          }

          .button-animation {
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
            overflow: hidden;
          }

          .button-animation:hover {
            transform: scale(1.1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
          }

          .button-animation::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            transition: left 0.4s ease;
          }

          .button-animation:hover::after {
            left: 100%;
          }
        `}
      </style>
    </div>
  );
}

export default HomePage;
