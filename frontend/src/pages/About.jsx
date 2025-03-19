import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* ✅ Navbar inside About Page */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Fake Job Detection</h2>
        <div>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/login" style={styles.navLink}>Login</Link>
          <Link to="/check" style={styles.navLink}>Job URL</Link>
          <Link to="/job-description" style={styles.navLink}>Job Description</Link>
        </div>
      </nav>

      {/* 📌 About Section (Now Centered with Cyan Highlight Animation) */}
      <div style={styles.container}>
        <div style={styles.aboutBox}>
          <h2 style={styles.title}>
            About <span className="highlight">SafeHire</span>
          </h2>
          <p style={styles.text}>
            SafeHire is a platform that helps users <span className="highlight">verify job listings</span> and 
            <span className="highlight"> company details</span> to ensure authenticity. It helps job seekers 
            make informed decisions and <span className="highlight">avoid potential scams.</span>  
            <br /> <strong>Verify before you apply with SafeHire!</strong>
          </p>
        </div>
      </div>

      {/* 🎨 Keyframe Animation for Cool Cyan Highlighting */}
      <style>
        {`
          @keyframes highlight {
            0% { color: #ffffff; }
            50% { color: #00E5FF; } /* ✅ Soft cyan highlight */
            100% { color: #ffffff; }
          }

          .highlight {
            animation: highlight 2s infinite alternate ease-in-out;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
};

// 🎨 Improved Styling
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.5rem", // ✅ Keep this big
    fontWeight: "bold",
  },
  navLink: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
    fontSize: "1rem", // ✅ Reduced size for links
    fontWeight: "400",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #141E30, #243B55)",
  },
  aboutBox: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    animation: "fadeIn 0.8s ease-in-out",
    width: "40%", // ✅ Adjusted for a more compact look
    minWidth: "320px",
  },
  title: {
    color: "#fff",
    fontSize: "1.8rem",
  },
  text: {
    color: "#ddd",
    fontSize: "1.2rem",
    marginTop: "10px",
    lineHeight: "1.6",
  },
};

export default About;
