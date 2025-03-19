import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importing Framer Motion

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) {
    return (
      <motion.div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{ background: "linear-gradient(135deg, #141E30, #243B55)", color: "#fff" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="card p-5 shadow-lg rounded-4 border-0 text-center"
          style={{
            width: "400px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#fff",
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2 initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.6 }}>
            No result found
          </motion.h2>
          <motion.button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/check")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
          <motion.button
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #141E30, #243B55)", color: "#fff" }}
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
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          Job Verification Result
        </motion.h2>

        <motion.div
          className="mt-3"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h4>Job Details</h4>
          <p><strong>Description:</strong> {result.job_description || "Not available"}</p>

          <h4>Prediction</h4>
          <motion.p
            style={{
              fontSize: "1.2rem",
              color: result.final_result === "Fake Job" ? "#E57373" : "#81C784", // Softer red & green
              margin: "8px 0",
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <strong>{result.final_result}</strong>
          </motion.p>

          <motion.button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/check")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Check Another Job
          </motion.button>
          <motion.button
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Go to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Result;
