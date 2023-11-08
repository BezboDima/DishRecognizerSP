import json
import openai

def lambda_handler(event, context):
    # TODO implement
    openai.api_key = ""
    prompt = "Generate a step-by-step recipe for " + str(event['prompt']) + " in a format suitable for display on a website. Include a list of ingredients and detailed instructions for each step. Ensure the format is clear, consistent, and optimized for website display, with ingredients listed first followed by sequential steps."
    
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role":"user", "content":prompt}])
    
    print(completion.choices[0].message.content)

    return {
        'statusCode': 200,
        'body': json.dumps('Result: ' + completion.choices[0].message.content)
    }
