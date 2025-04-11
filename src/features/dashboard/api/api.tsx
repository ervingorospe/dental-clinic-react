const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiPUT = async (endpoint: string, body: any) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: "include"
  })

  const data = await response.json()

  return { status: response.status, data}
}

export const apiGET = async (endpoint: string) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include"
  })

  const data = await response.json()

  return { status: response.status, data}
}