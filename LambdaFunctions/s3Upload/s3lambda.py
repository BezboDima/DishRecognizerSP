import boto3
from botocore.exceptions import ClientError
import uuid


def upload_file(event, context):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """
    # Create a random Id
    random_uuid = uuid.uuid4()

    # Extract the first 8 characters from the UUID
    random_id = str(random_uuid)[:8]
    
    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.put_object(
            Body=event["b_image"],
            Bucket=event["bucket"],
            Key=event["key"],
        )
    except ClientError as e:
        return False
    return True