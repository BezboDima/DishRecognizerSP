import boto3
import hashlib
import json
def lambda_handler(event, context):
    """Function returns the bool value depending if the user is registered or not in the
    database given their login and password

    :param login: email of the user
    :param password: password of the user
    :returns: Bool of whether the user was found or not
    """
    try:
        #connect to the database
        dynamodb = boto3.resource("dynamodb")
        table_name = "LoginInfo"
        table = dynamodb.Table(table_name)
        
        responce = table.get_item(Key={'email':event['login']})
        
        sha256 = hashlib.sha256()
        sha256.update(event['password'].encode('utf-8'))
        hashed_password = sha256.hexdigest()
        
        if(hashed_password == responce["Item"]['password']):
            status = True
        else:
            status = False
        resp = {
            'status' : status
        } 
        return json.loads(json.dumps(resp))
    except Exception as e:
        data = {
            'status' : False,
            'error' : e
        }
        return json.loads(json.dumps(data))
if __name__ == '__main__':
    event = {"login" : "bezbo", "password" : "bb"}
    print(lambda_handler(event, None))