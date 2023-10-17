import json
import requests

def custom_function():
    response = requests.get("https://example.com")
    return response.text

def lambda_handler(event, context):
    # TODO implement
    newText = custom_function()
    return {
        'statusCode': 200,
        'body': json.dumps(newText)
    }
