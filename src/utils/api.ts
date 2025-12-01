const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // 如果有access token，添加到请求头
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const authAPI = {

  // 验证Credential
  verifyGoogleCredential: async (credential: string) => {
    const res = await apiRequest('/api/auth/verify-google-credential', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    });

    if (res.success && res.data) {
      const { token, user } = res.data;
      localStorage.setItem('google_token', token);
      localStorage.setItem('google_user_info', JSON.stringify(user));
    }

    return res;
  },

  // 用户注册
  userRegister: async (userData: any) => {
    await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 用户登录
  userLogin: async (userData: any) => {
    const res = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (res.success && res.data) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_info', JSON.stringify(user));
    }

    return res;
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
};

export default API_BASE_URL;
