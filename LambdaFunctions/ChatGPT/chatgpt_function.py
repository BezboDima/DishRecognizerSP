import json
import openai

def lambda_handler(event, context):
    # TODO implement
    openai.api_key = ""
    prompt = str(event['prompt'])
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role":"user", "content":prompt}])
    
    print(completion.choices[0].message.content)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Result: ' + completion.choices[0].message.content)
    }
