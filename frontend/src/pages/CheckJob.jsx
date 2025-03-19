import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion
import "bootstrap/dist/css/bootstrap.min.css";

function CheckJob() {
  const [jobUrl, setJobUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Check Job - SafeHire"; // Page title update
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: jobUrl }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.status === "error") {
        alert(result.message);
        return;
      }

      navigate("/result", { state: result }); // Pass data to Result page
    } catch (error) {
      console.error("Error fetching result:", error);
      setLoading(false);
    }
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
          width: "450px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          className="text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Check Job Validity
        </motion.h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Listing URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Paste the job listing URL..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              required
              style={{
                transition: "0.3s",
                outline: "none",
                borderColor: "transparent",
                boxShadow: "none",
              }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 8px rgba(255, 255, 255, 0.5)")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={loading ? { scale: [1, 1.1, 1] } : {}}
            transition={loading ? { duration: 0.5, repeat: Infinity } : {}}
          >
            {loading ? "Checking..." : "Check Job"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default CheckJob;
