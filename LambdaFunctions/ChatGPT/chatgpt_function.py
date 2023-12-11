import openai
import os
import json
import re

def lambda_handler(event, context):
    # Gets access key from environment variables.
    openai.api_key = os.environ['access_key']
    
    print(event)
    print(event['body'])
    body_dict = json.loads(event['body'])
    label_value = body_dict.get('label')

    # Lays out the prompt to send to OpenAI.
    #prompt = "Generate a step-by-step recipe for " + str(label_value) + " in a format suitable for display on a website. Include a list of ingredients and detailed instructions for each step. Ensure the format is clear, consistent, and optimized for website display, with ingredients listed first followed by sequential steps. Label each step in the following format: \"Step 1: \"."
    
    prompt = "Generate a step-by-step recipe for " + str(label_value) + """ in a format suitable for display on a website. Include a list of ingredients and detailed instructions for each step. Ensure the format is clear, consistent, and optimized for website display, with ingredients listed first followed by sequential steps. Use the following format:

Recipe Prompt Format:

1. Dish Name: [Enter Dish Name]
2. Ingredients:
   - [Ingredient 1]
   - [Ingredient 2]
   - [Ingredient 3]
   - ...
3. Instructions:
   1. [Step 1]
   2. [Step 2]
   3. [Step 3]
   4. ..."""

    # Gets gpt-3.5-turbo's response to the prompt.
    completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role":"user", "content":prompt}])
    recipe = completion.choices[0].message.content
    # Prints and returns the response in json format.
    print(recipe)

    # REGEX STUFF
    ingredient_pattern = r'-\s\d?.*'
    # Find all matches of ingredients in the recipe
    ingredients = re.findall(ingredient_pattern, recipe)
    # Display the captured ingredients
    for ingredient in ingredients:
        print(ingredient)

    step_pattern = r'\n\s+\d+\.(?!\sInstructions:)(?!\sDish\sName:\s)(?!Ingredients:)(.+)'
    numbered_step_pattern = r'\n\d+\.(.+)\n'
    # Find all matches in the instruction text
    steps = re.findall(step_pattern, recipe, re.DOTALL)
    print(steps)
    if len(steps) > 0:
        split_pattern = r'\d+\.'
        splitSteps = re.split(split_pattern,steps[0])
        print(splitSteps)
        steps = splitSteps

    if len(steps) == 0:
        steps = re.findall(numbered_step_pattern, recipe, re.DOTALL)
    print(steps)

    handled_steps = []
    num = 1
    print()

    for step in steps:
        #step_number = step[0]
        step_number = num
        #step_description = step[1]
        step_description = step.strip()
        #step_parts = step[2].strip().split('\n') if step[2] else []
    
        handled_steps.append({
            'number': step_number,
            'description': step_description,
            #'parts': step_parts
        })

        print(f"Step {step_number}: {step_description}")
        #for part in step_parts:
         #   print(part.strip())
        print()
        num += 1

    recipe_data = {
        'ingredients': ingredients,
        'steps': handled_steps
    }

    response = {
        'statusCode': 200,
        #'body': json.dumps({ 'response': completion.choices[0].message.content }),
        'body': json.dumps(recipe_data)
    }
    return response
