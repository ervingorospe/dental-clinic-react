const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiAuthPost = async (endpoint: string, body: any) => {
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