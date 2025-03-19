from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.scrape import scrape_job_details
from routes.verify_company import verify_company_status
from routes.predict import predict_fake_job

app = Flask(__name__)
CORS(app)

@app.route("/scrape", methods=["POST"])
def scrape():
    data = request.json
    job_url = data.get("url", "")
    return scrape_job_details(job_url)

@app.route("/verify_company", methods=["POST"])
def verify_company():
    data = request.json
    if not data or "company_name" not in data or not data["company_name"].strip():
        return jsonify({"status": "error", "message": "Company name is required"}), 400
    
    company_name = data["company_name"].strip()
    result = verify_company_status(company_name)
    return jsonify(result)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    job_details = data.get("job_details", "")
    return predict_fake_job(job_details)

@app.route("/result", methods=["POST"])
def final_result():
    data = request.json
    job_url = data.get("url", "")

    if not job_url:
        return jsonify({"status": "error", "message": "No URL provided"}), 400

    # Step 1: Scrape job details
    scraped_data = scrape_job_details(job_url)
    if scraped_data.get("status") == "error":
        return jsonify(scraped_data)

    job_desc = scraped_data.get("description", "")
    company_name = scraped_data.get("company", "Unknown Company")

    # Step 2: Verify company status
    company_status = verify_company_status(company_name)
    company_not_found = company_status.get("status") == "not_found"

    # Step 3: Predict fake job
    prediction_response = predict_fake_job(job_desc)  # Fix: Extract correctly
    ml_prediction = prediction_response.get("prediction", "Real Job")  # Extract result properly

    is_fake = ml_prediction == "Fake Job"

    # Step 4: Determine final result
    if is_fake or company_not_found:
        final_result = "Fake Job"
    else:
        final_result = "Real Job"

    print("ML Prediction:", ml_prediction)  # Debugging
    print("Company Status:", company_status)  # Debugging
    print("Final Decision:", final_result)  # Debugging

    return jsonify({
        "status": "success",
        "job_description": job_desc,
        "company_name": company_name,
        "company_status": company_status if company_status else {"status": "Unknown"},
        "prediction": ml_prediction,
        "final_result": final_result
    })

if __name__ == "__main__":
    app.run(debug=True)
