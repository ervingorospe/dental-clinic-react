const API_BASE_URL = 'http://a4cbfd3130c094423b2aceb252832a9e-260997032.ap-southeast-2.elb.amazonaws.com';

export const apiAuthPost = async (endpoint: string, body: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: "include"
    })
  
    const data = await response.json()
    return { status: response.status, data}
  } catch (error) {
    throw error
  }
}

export const apiAuthLogout = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })
  
    const data = await response.json()
    return { status: response.status, data}
  } catch (error) {
    throw error
  }
}