# 🧠 Fake Job Detection Using Machine Learning

This project aims to detect fraudulent job postings by analyzing job descriptions, verifying company legitimacy, and applying a trained machine learning model. It provides a complete pipeline that integrates web scraping, API-based company verification, and machine learning prediction to enhance online job safety.



## 🔍 Overview

Online job scams have become increasingly common and deceptive. This system combats this issue by automating:

- **Job detail extraction** from provided job URLs  
- **Company legitimacy verification** via OpenCorporates API  
- **Job fraud prediction** using a trained ML model  



## ⚙️ Technologies Used

- **Python**
- **Flask** (RESTful API)
- **BeautifulSoup** (Web scraping)
- **scikit-learn** (ML model training)
- **SpaCy** (Text preprocessing)
- **TF-IDF Vectorizer**
- **SMOTE** (For handling class imbalance)
- **OpenCorporates API**
- **Joblib** (Model serialization)



## 📁 Project Structure

.
├── app.py # Main Flask app
├── model2/
│ ├── Fake_Job3.pkl # Trained ML model
│ └── Vectorizer3.pkl # TF-IDF vectorizer
├── routes/
│ ├── scrape.py # Scrapes job details from URL
│ ├── verify_company.py # Verifies company status via API
│ └── predict.py # Predicts job authenticity
├── config.py # API key configuration
├── requirements.txt
└── README.md


## 🔗 API Endpoints

| Method | Endpoint           | Description                                      |
|--------|--------------------|--------------------------------------------------|
| POST   | `/scrape`          | Scrapes job title, company, and description     |
| POST   | `/verify_company`  | Checks if the company is legitimate              |
| POST   | `/predict`         | Predicts if the job is fake or real              |
| POST   | `/result`          | Executes full flow: scrape → verify → predict    |



## 📈 Model Details

- **Algorithm**: Random Forest Classifier  
- **Accuracy**: ~90% on test dataset  
- **G-Mean**: Used to ensure balance between sensitivity and specificity  
- **Text Vectorization**: TF-IDF after cleaning with SpaCy  
- **Imbalance Handling**: SMOTE (Synthetic Minority Oversampling)



## 🚀 How to Run

### Prerequisites

- A valid [OpenCorporates](https://api.opencorporates.com/documentation/API-Reference) API key

### Installation

```bash
git clone https://github.com/your-username/fake-job-detector.git
cd fake-job-detector
pip install -r requirements.txt
Running the Flask App
bash
Copy
Edit
python app.py
📬 Sample API Usage
/result Endpoint Input
json
Copy
Edit
{
  "url": "https://example.com/job-posting"
}
Sample Output
json
Copy
Edit
{
  "status": "success",
  "job_description": "...",
  "company_name": "Example Corp",
  "company_status": {
    "status": "active",
    "jurisdiction": "us_ny"
  },
  "prediction": "Fake Job",
  "final_result": "Fake Job"
}
