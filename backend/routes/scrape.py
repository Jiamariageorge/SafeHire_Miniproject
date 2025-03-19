import requests
from bs4 import BeautifulSoup
import json
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def scrape_job_details(url):
    if not url:
        return {"status": "error", "message": "No URL provided"}

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code != 200:
            return {"status": "error", "message": f"Failed to fetch page, status code: {response.status_code}"}

        soup = BeautifulSoup(response.text, "html.parser")
        
        # Extract company name dynamically
        company_name = extract_company_name(soup, response.text)

        # Extract job title
        job_title = extract_text(soup, [
            "h1[data-label='job_title']", "h1", ".job-title", ".posting-title",
            "meta[property='og:title']", "meta[name='title']"
        ], "Unknown Job Title")

        # Extract job description
        description = extract_text(soup, [
            "div[data-label='job_description']", "p[data-label='job_description']", ".job-description", ".description", 
            "div.description", "section.job-description", "article", 
            "meta[property='og:description']", "meta[name='description']"
        ], "No Description Found", max_length=1000)
        
        logging.info(f"✅ Extracted Job Title: {job_title}")
        logging.info(f"✅ Extracted Company: {company_name}")
        logging.info(f"✅ Extracted Job Description: {description[:200]}...")
        
        return {
            "status": "success",
            "company": company_name,
            "title": job_title,
            "description": description
        }
    
    except Exception as e:
        logging.error(f"Error: {str(e)}")
        return {"status": "error", "message": str(e)}


def extract_company_name(soup, page_text):
    """Extract company name dynamically using multiple strategies."""
    # Try extracting from structured data (JSON-LD)
    for script in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(script.string)
            if isinstance(data, dict) and "hiringOrganization" in data:
                return data["hiringOrganization"].get("name", "Unknown Company")
        except json.JSONDecodeError:
            continue
    
    # Try common HTML selectors
    company_selectors = [
        "h2[data-label='company_name']", "span.company-name", "div.company", "h3.company", "p.company",
        "meta[itemprop='hiringOrganization']", "meta[name='company']", "meta[property='og:site_name']",
        ".job-header-company", ".employer", ".company-info"
    ]
    
    company_name = extract_text(soup, company_selectors, default="Unknown Company")
    
    # Fall back to extracting from page title if no company name found
    if company_name == "Unknown Company":
        page_title = soup.title.string if soup.title else ""
        if " at " in page_title:
            company_name = page_title.split(" at ")[-1].strip()
    
    return company_name


def extract_text(soup, selectors, default="Not Found", max_length=500):
    """Extracts cleaned text, checks meta tags, and limits excessive length."""
    for selector in selectors:
        element = soup.select_one(selector)
        if element:
            text = element.text.strip() if element.name != "meta" else element.get("content", "").strip()
            if text:
                return text[:max_length]  # Limit to first 'max_length' characters
    return default

# Test the scraper
if __name__ == "__main__":
    test_url = input("Enter a job listing URL: ")
    result = scrape_job_details(test_url)
    print(result)
