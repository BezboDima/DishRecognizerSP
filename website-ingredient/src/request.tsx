export async function callPostGatewayApi (endpoint: string, requestData: any) {
  try {
    const response = await fetch(`https://2flnmxf7eh.execute-api.us-east-1.amazonaws.com/dev/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json() // Parse the JSON response
    console.log(data)
    return data // Return the parsed JSON data
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error(error)
    throw error // Re-throw the error to indicate failure
  }
}

export async function callPostLambda (requestData: any) {
  try {
    const response = await fetch('https://x2l5y4bencpai3y6bv73ml7aky0qhxzu.lambda-url.us-east-1.on.aws/', {
      method: 'POST',
      body: JSON.stringify(requestData)
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json() // Parse the JSON response
    console.log(data)
    return data // Return the parsed JSON data
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error(error)
    throw error // Re-throw the error to indicate failure
  }
}

export async function callGetGatewayApi (endpoint: string, requestData: any) {
  try {
    const response = await fetch(`https://8oit3h86n1.execute-api.us-east-1.amazonaws.com/default/${endpoint}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

    if (!response.ok) {
      // Handle error
      throw new Error(`API request failed with status ${response.status}`)
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    // Handle any network or other errors
    console.error('API request error:', error)
    throw error
  }
}
