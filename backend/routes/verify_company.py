import requests
from config import OPENCORPORATES_API_KEY  # Import API key

def verify_company_status(company_name, debug=False):
    """Queries OpenCorporates API and finds the most relevant company match."""
    base_url = "https://api.opencorporates.com/v0.4/companies/search"
    params = {
        "q": company_name,
        "api_token": OPENCORPORATES_API_KEY,
        "per_page": 50  # Fetch more results
    }

    try:
        response = requests.get(base_url, params=params)

        if debug:
            print(f"Response Status Code: {response.status_code}")

        if response.status_code != 200:
            return {"status": "error", "message": f"API request failed with status {response.status_code}"}

        response_data = response.json()

        if not response_data or "results" not in response_data or "companies" not in response_data["results"]:
            return {"status": "error", "message": "Invalid API response"}

        companies = response_data["results"]["companies"]

        # 🔹 Find best matching company
        for company in companies:
            fetched_name = company["company"]["name"]
            if company_name.lower() in fetched_name.lower():  # Looser match
                return {
                    "company_name": fetched_name,
                    "company_number": company["company"]["company_number"],
                    "jurisdiction": company["company"]["jurisdiction_code"],
                    "status": company["company"]["current_status"],
                    "opencorporates_url": company["company"]["opencorporates_url"]
                }

        return {"status": "not_found", "message": "Company not found"}

    except requests.exceptions.RequestException as e:
        return {"status": "error", "message": f"Request failed: {str(e)}"}

    except ValueError as e:  # JSON decode error
        return {"status": "error", "message": f"Invalid JSON response: {str(e)}"}

# 🔹 Debug mode can be enabled when testing
if __name__ == "__main__":
    test_company = input("Enter company name: ")
    result = verify_company_status(test_company, debug=True)
    print(result)
