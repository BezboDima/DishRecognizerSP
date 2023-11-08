import boto3
import urllib.request
import urllib.parse
import urllib.error
import base64

print('Loading function')

client = boto3.client('rekognition')


# --------------- Helper Function to call Rekognition API ------------------

#def detect_labels(bucket, key):
def detect_labels(image):
     #response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':key}},
     response = client.detect_labels(Image={'Bytes': image},
     MaxLabels=10,
     # Uncomment to use image properties and filtration settings
     Features=["GENERAL_LABELS", "IMAGE_PROPERTIES"],
     Settings={"GeneralLabels": {"LabelExclusionFilters": ["Food"], "LabelCategoryInclusionFilters":["Food and Beverage"]},
      "ImageProperties": {"MaxDominantColors":10}}
     )
     return response["Labels"]

# --------------- Main handler ------------------

def lambda_handler(event, context):
    '''Demonstrates S3 trigger that uses
    Rekognition APIs to detect faces, labels and index faces in S3 Object.
    '''
    #print("Received event: " + json.dumps(event, indent=2))

    # Get the object from the event
    #bucket = event['Records'][0]['s3']['bucket']['name']
    #key = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'])

    image_bytes = base64.b64decode(event["b_image"], validate=True)

    try:
        # Calls rekognition DetectLabels API to detect labels in S3 object
        response = detect_labels(image_bytes)

        # Print response to console.
        print(response)

        return response
    
    except Exception as e:
        print(e)
        print("Error processing object.")
        raise e