import boto3
import hashlib

def lambda_handler(event, context):
    
    try:
        dynamodb = boto3.resource("dynamodb")
        table_name = "LoginInfo"
        table = dynamodb.Table(table_name)
        
        response = table.get_item(
            Key={
                'email': str(event['login']),
            }
        )
        print(response)
        item = response['Item']

        if item:
            # Step 2: Update the array in the item
            array_field_name = 'history'  # Replace with the name of your array field

            # Initialize the array if it doesn't exist
            item[array_field_name] = item.get(array_field_name, [])

            # Add a new dictionary to the array
            item[array_field_name].append(event['historyItem'])
            
            # Step 3: Save the modified item back to DynamoDB
            update_response = table.update_item(
                Key={
                    'email': event['login'],
                },
                UpdateExpression=f'SET {array_field_name} = :newArray',
                ExpressionAttributeValues={
                    ':newArray': item[array_field_name],
                },
                ReturnValues='ALL_NEW',  # Change as needed
            )

            updated_item = update_response.get('Attributes')
        
        return {'status' : True, 'updated_item': updated_item}
    except Exception as e:
        print(e)
        return {'status' : False, 'error': str(e)}

if __name__ == '__main__':
    event = {"login" : "m", "password" : "1234"}
    print(lambda_handler(event, None))   