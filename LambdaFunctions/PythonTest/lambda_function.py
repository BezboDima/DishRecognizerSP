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
