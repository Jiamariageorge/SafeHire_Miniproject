import joblib
import numpy as np

# Load pre-trained model and vectorizer
model = joblib.load("models/Fake_Job.pkl")
vectorizer = joblib.load("models/Vectorizer.pkl")

def clean_text(text):
    """Cleans the job description text by converting it to lowercase and stripping spaces."""
    return text.lower().strip()

def predict_fake_job(description):
    if not description:
        return {"status": "error", "message": "No job description provided"}

    try:
        # Clean and preprocess the description
        description = clean_text(description)
        print("Processed Description:", description)  # Debugging Output

        # Transform text using the vectorizer
        transformed_text = vectorizer.transform([description])
        print("Transformed Text Shape:", transformed_text.shape)  # Debugging

        # Get probability predictions
        probabilities = model.predict_proba(transformed_text)[0]
        fake_prob = probabilities[1]  # Probability of "Fake Job"
        real_prob = probabilities[0]  # Probability of "Real Job"

        print("Prediction Probabilities:", probabilities)

        # Adjust threshold: Fake Job if Fake Probability >= 40%
        result = "Fake Job" if fake_prob >= 0.4 else "Real Job"

        print("Raw Model Prediction:", result)
        return {"status": "success", "prediction": result}

    except Exception as e:
        print("Prediction Error:", str(e))  # Debugging
        return {"status": "error", "message": str(e)}
