import json
import requests
from common_layer.common_module import custom_function
def lambda_handler(event, context):
    # TODO implement
    text = custom_function()
    return {
        'statusCode': 200,
        'body': json.dumps(text)
    }
