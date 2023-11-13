import boto3
import hashlib

def lambda_handler(event, context):
    
    try:
        dynamodb = boto3.resource("dynamodb")
        table_name = "LoginInfo"
        table = dynamodb.Table(table_name)
        
        sha256 = hashlib.sha256()
        sha256.update(event['password'].encode('utf-8'))
        hashed_password = sha256.hexdigest()
        
        responce = table.put_item(Item={"login": event['login'], "password":hashed_password}, ConditionExpression="attribute_not_exists(login)")
        
        return {'exist': False}
    except Exception as e:
        print(e)
        return {'exist': True}

if __name__ == '__main__':
    event = {"login" : "m", "password" : "1234"}
    print(lambda_handler(event, None))