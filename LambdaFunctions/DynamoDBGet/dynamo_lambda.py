import boto3
import hashlib
def lambda_handler(event, context):
    
    try:
        dynamodb = boto3.resource("dynamodb")
        table_name = "LoginInfo"
        table = dynamodb.Table(table_name)
        
        responce = table.get_item(Key={'login':event['login']})
        
        sha256 = hashlib.sha256()
        sha256.update(event['password'].encode('utf-8'))
        hashed_password = sha256.hexdigest()
        
        if(hashed_password == responce["Item"]['password']['S']):
            return {
                'status' : True
            }
        else:
            return {
                'status' : False
            }
    except Exception as e:
        data = {
            'status' : False,
            'error' : e
        }
        return data
if __name__ == '__main__':
    event = {"login" : "me", "password" : "1234"}
    print(lambda_handler(event, None))