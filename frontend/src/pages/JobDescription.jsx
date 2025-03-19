import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { motion } from "framer-motion";

const JobDescription = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [finalResult, setFinalResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleCheckJob = async () => {
    if (!companyName.trim() || !jobDescription.trim()) {
      alert("Please enter both company name and job description.");
      return;
    }

    setLoading(true);
    setFinalResult(null);

    try {
      const companyResponse = await fetch("http://127.0.0.1:5000/verify_company", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_name: companyName }),
      });
      const companyData = await companyResponse.json();
      const companyNotFound = companyData.status === "not_found";

      const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_details: jobDescription }),
      });
      const predictionData = await predictionResponse.json();
      const mlPrediction = predictionData.prediction || "Real Job";
      const isFake = mlPrediction === "Fake Job";

      // Determine final result
      const finalDecision = isFake || companyNotFound ? "Fake Job" : "Real Job";
      setFinalResult(finalDecision);
    } catch (error) {
      console.error("Error checking job:", error);
      setFinalResult("Error checking job");
    }

    setLoading(false);
  };

  const handleReset = () => {
    setCompanyName("");
    setJobDescription("");
    setFinalResult(null);
  };

  return (
    <motion.div
      className="vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{ background: "linear-gradient(135deg, #141E30, #243B55)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Go to Home Button */}
      <motion.button
        className="btn btn-light position-absolute top-0 end-0 m-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")} // Navigate to home page
      >
        Go to Home
      </motion.button>

      <motion.div
        className="card p-5 shadow-lg rounded-4 border-0"
        style={{
          width: "500px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h2 className="text-center mb-4">Check Job Details</h2>
        <p className="text-center">Enter the company name and job description below to check if it's fake or real.</p>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter company name..."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <textarea
          className="form-control"
          rows="5"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <motion.button
          className="btn btn-primary w-100 mt-3 fw-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckJob}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Job"}
        </motion.button>

        {finalResult && (
          <>
            <div className={`alert mt-3 ${finalResult === "Fake Job" ? "alert-danger" : "alert-success"}`}>
              <strong>{finalResult}</strong>
            </div>

            <motion.button
              className="btn btn-secondary w-100 mt-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
            >
              Check Another Job
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default JobDescription;
