import boto3

def lambda_handler(event, context):
    
    try:
        dynamodb = boto3.resource("dynamodb")
        table_name = "UserTable"
        table = dynamodb.Table(table_name)
        
        responce = table.get_item(Key={'login':event['login']})
        
        data = {
            'status' : True,
            'user_info': responce["Item"]
        }
        return data
    except:
        data = {
            'status' : False
        }
        return data
if __name__ == '__main__':
    event = {"login" : "me", "password" : "1234"}
    print(lambda_handler(event, None))