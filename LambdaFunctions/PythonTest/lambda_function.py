import json
import requests
from layers.common_layer.common_module import custom_function
def lambda_handler(event, context):
    # TODO implement
    newText = custom_function()
    return {
        'statusCode': 200,
        'body': json.dumps(newText)
    }

# https://platform.openai.com/docs/api-reference/authentication
# https://platform.openai.com/docs/api-reference/chat

# To install the official Python bindings, run the following command:
#   pip install openai
# To install the official Node.js library, run the following command in your Node.js project directory:
#   npm install openai@^4.0.0

# example
def callChatGPTAPI():
    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]
)