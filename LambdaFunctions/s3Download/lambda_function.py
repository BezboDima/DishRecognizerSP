import boto3
from botocore.exceptions import NoCredentialsError, NoSuchKey
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
        print(response)
        # Read the content of the response
        image_content = response['Body'].read()

        # Encode the binary data to Base64
        base64_encoded_image = base64.b64encode(image_content).decode('utf-8')
 
        print(base64_encoded_image)
        return {'status' : True, 'image' : base64_encoded_image}
    except NoSuchKey as e:
        print(f"The specified key {event["key"]} does not exist in the bucket {event["bucket"]}.")
        return {'status' : False}
    except NoCredentialsError:
        print("Credentials not available.")
        return {'status' : False}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {'status' : False}
    
if __name__ == "__main__":
    event = {"bucket" : "gereral-bucket", "key" : "user-image/dimabezbo@gmail.com/4ea5c508.png"}
    print(download_file(event, None))   
