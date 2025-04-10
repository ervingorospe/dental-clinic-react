export const checkAuthStatus = async (): Promise<{ isAuthenticated: boolean, user?: any }> => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(apiBaseUrl);

  try {
    let response = await fetch(`${apiBaseUrl}/api/auth/authenticate`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.status === 401) {
      const refreshResponse = await fetch(`${apiBaseUrl}/api/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshResponse.ok) {
        response = await fetch(`${apiBaseUrl}/api/auth/authenticate`, {
          method: 'GET',
          credentials: 'include',
        });
      } else {
        console.error('Failed to refresh access token');
        return { isAuthenticated: false };
      }
    }
    
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error("Authentication check failed", error);
    return { isAuthenticated: false };
  }
};
