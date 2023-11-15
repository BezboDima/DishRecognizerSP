import openai
import os
import json

def lambda_handler(event, context):
    # Gets access key from environment variables.
    openai.api_key = os.environ['access_key']
    
    print(event)
    print(event['body'])
    body_dict = json.loads(event['body'])
    label_value = body_dict.get('label')

    # Lays out the prompt to send to OpenAI.
    prompt = "Generate a step-by-step recipe for " + str(label_value) + " in a format suitable for display on a website. Include a list of ingredients and detailed instructions for each step. Ensure the format is clear, consistent, and optimized for website display, with ingredients listed first followed by sequential steps."
    
    # Gets gpt-3.5-turbo's response to the prompt.
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role":"user", "content":prompt}])
    
    # Prints and returns the response in json format.
    print(completion.choices[0].message.content)
    response = {
        'statusCode': 200,
        'body': json.dumps({ 'response': completion.choices[0].message.content }),
    }
    return response
