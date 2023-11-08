import boto3

def lambda_handler(event, context):
    
    try:
        dynamodb = boto3.resource("dynamodb")
        table_name = "UserTable"
        table = dynamodb.Table(table_name)
        
        responce = table.put_item(Item={"login": event['login'], "password":event['password']}, ConditionExpression="attribute_not_exists(login)")
        
        return {'exist': False}
    except Exception as e:
        print(e)
        return {'exist': True}

if __name__ == '__main__':
    event = {"login" : "m", "password" : "1234"}
    print(lambda_handler(event, None))