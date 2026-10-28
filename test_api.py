import requests

# Test the backend API
url = "http://127.0.0.1:8000/api/calculator/calculate"
data = {"expression": "3 + 5"}

try:
    response = requests.post(url, json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
except Exception as e:
    print(f"Error: {e}")
