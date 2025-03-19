import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/about"); // ✅ Now redirects to About page
  };

  return (
    <motion.div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #141E30, #243B55)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="card p-5 shadow-lg rounded-4 border-0"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-center mb-4">Login to SafeHire</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <span
              className="text-primary fw-bold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
