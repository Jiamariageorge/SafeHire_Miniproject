import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/check");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #1c92d2, #f2fcfe)" }}
    >
      <div className="card p-5 shadow-lg rounded-4 border-0" style={{ width: "400px", background: "rgba(255, 255, 255, 0.85)" }}>
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
            />
          </div>
          <button className="btn btn-primary w-100 fw-bold">Login</button>
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
      </div>
    </div>
  );
}

export default Login;