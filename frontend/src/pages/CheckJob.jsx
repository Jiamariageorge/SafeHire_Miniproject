import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CheckJob() {
  const [jobUrl, setJobUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job URL submitted:", jobUrl);
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #1c92d2, #f2fcfe)" }}
    >
      <div
        className="card p-5 shadow-lg rounded-4 border-0"
        style={{ width: "400px", background: "rgba(255, 255, 255, 0.85)" }}
      >
        <h2 className="text-center mb-4">Check Job Validity</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Listing URL</label>
            <input
              type="text"
              className="form-control"
              placeholder="Paste the job URL here..."
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
            />
          </div>
          <button className="btn btn-primary w-100 fw-bold">Check Job</button>
        </form>
      </div>
    </div>
  );
}

export default CheckJob;
