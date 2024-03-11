import boto3
from botocore.exceptions import ClientError
import base64

def download_file(event, context):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    
    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.get_object(
            Bucket=event["bucket"],
            Key=event["key"],
        )
        # Read the content of the response
        image_content = response['Body'].read()

        # Encode the binary data to Base64
        base64_encoded_image = base64.b64encode(image_content).decode('utf-8')

        return {'status' : True, 'image' : base64_encoded_image}
    except ClientError as e:
        return False