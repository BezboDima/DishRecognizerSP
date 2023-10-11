# custom_module.py

import requests

def custom_function():
    response = requests.get("https://example.com")
    return response.text