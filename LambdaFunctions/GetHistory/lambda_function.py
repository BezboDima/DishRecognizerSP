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
        
        response = table.get_item(
            Key={
                'email':str(event['login'])
            },
            ConsistentRead=True
        )
        
        item = response['Item']

        # Replace 'your-attribute-name' with the attribute you want to retrieve
        attribute_value = item.get(event['item'])
        return {'status' : True, 'item' : attribute_value}
    except Exception as e:
        print(e)
        return {'status' : False, 'error': str(e)}
if __name__ == '__main__':
    event = {"login" : "bezbo", "password" : "bb"}
    print(lambda_handler(event, None))