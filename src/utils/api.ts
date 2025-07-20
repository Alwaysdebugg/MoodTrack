const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  // In production (Vercel), use relative URLs to leverage rewrites
  // In development, use the proxy setup in vite.config.ts
  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  // 如果有access token，添加到请求头
  const accessToken = localStorage.getItem('token')
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    }
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export const authAPI = {
  
  // 获取Google OAuth登录URL
  getGoogleLoginUrl: () => {
    // In production (Vercel), use relative URL to leverage rewrites
    // In development, use current origin since Vite proxy handles /oauth2
    const baseUrl = API_BASE_URL || window.location.origin
    return API_BASE_URL ? `${baseUrl}/oauth2/authorization/google` : '/oauth2/authorization/google'
  },
  
  // 验证从回调中获取的token
  verifyCallbackToken: (token: string) => 
    apiRequest('/api/auth/verify-token', {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
  
  refreshToken: (refreshToken: string) =>
    apiRequest('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    }),
  
  logout: () =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
    }),
}

export default API_BASE_URL