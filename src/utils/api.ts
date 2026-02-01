import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
export const AUTH_ERROR_EVENT = 'auth-error';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('API request failed:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const { response, message } = error;
    if (response) {
      const { status, data } = response;

      if (status === 401) {
        console.error('Unauthorized');
        window.dispatchEvent(new CustomEvent(AUTH_ERROR_EVENT));
        return Promise.reject({ message: 'Unauthorized', data });
      }
      // TODO: Business error handling
      console.error('API response error:', status, data);
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

// Wrapper request method
export const apiRequest = async (
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    data?: any;
    params?: any;
    headers?: Record<string, string>;
  } = {}
) => {
  const { method = 'GET', data, params, headers } = options;

  try {
    const response = await apiClient({
      url: endpoint,
      method,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('apiRequest', error);
    throw error;
  }
};

export const authAPI = {
  // Verify Credential
  verifyGoogleCredential: async (credential: string) => {
    const res = await apiRequest('/api/auth/verify-google-credential', {
      method: 'POST',
      data: { credential },
    });

    if (res.success && res.data) {
      const { token, user } = res.data;
      localStorage.setItem('google_token', token);
      localStorage.setItem('google_user_info', JSON.stringify(user));
    }

    return res;
  },

  // User registration
  userRegister: async (userData: any) => {
    await apiRequest('/api/auth/register', {
      method: 'POST',
      data: userData,
    });
  },

  // User login
  userLogin: async (userData: any) => {
    const res = await apiRequest('/api/auth/login', {
      method: 'POST',
      data: userData,
    });

    if (res.success && res.data) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_info', JSON.stringify(user));
    }

    return res;
  },

  // Verify token from callback
  verifyCallbackToken: (token: string) =>
    apiRequest('/api/auth/verify-token', {
      method: 'POST',
      data: { token },
    }),

  refreshToken: (refreshToken: string) =>
    apiRequest('/api/auth/refresh', {
      method: 'POST',
      data: { refreshToken },
    }),

  logout: () =>
    apiRequest('/api/auth/logout', {
      method: 'POST',
    }),
};

export const moodAPI = {
  // Create mood entry
  createMood: async (moodData: any) => {
    return await apiRequest('/api/moods', {
      method: 'POST',
      data: moodData,
    });
  },
  // Get mood entries list
  getMoods: async () => {
    const res = await apiRequest('/api/moods', {
      method: 'GET',
    });
    return res.data;
  },
  // Get mood entry details
  getMood: async (moodId: string) => {
    return await apiRequest(`/api/moods/${moodId}`, {
      method: 'GET',
    });
  },
  // Delete mood entry
  deleteMood: async (moodId: string) => {
    return await apiRequest(`/api/moods/${moodId}`, {
      method: 'DELETE',
    });
  },
};

export const communityAPI = {
  // Get community topics
  getCommunityTopics: async () => {
    return await apiRequest('/api/community/topics', {
      method: 'GET',
    });
  },
  // Update online status (heartbeat)
  updateOnlineStatus: async (sessionId?: string) => {
    return await apiRequest('/api/community/online-status/heartbeat', {
      method: 'POST',
      data: { sessionId },
    });
  },
  // Remove online status
  removeOnlineStatus: async (sessionId?: string) => {
    return await apiRequest('/api/community/online-status/remove', {
      method: 'POST',
      data: { sessionId },
    });
  },
  // Get current online users
  getOnlineUsers: async () => {
    return await apiRequest('/api/community/online-users', {
      method: 'GET',
    });
  },
  // Get community mood posts list
  getCommunityPosts: async () => {
    return await apiRequest('/api/community/moods', {
      method: 'GET',
    });
  },
  // Get community mood post details
  getCommunityMood: async (moodId: string) => {
    return await apiRequest(`/api/community/moods/${moodId}`, {
      method: 'GET',
    });
  },
  // Like
  // likeCommunityMood: async (moodId: string) => {
  //   return await apiRequest(`/api/community/moods/${moodId}/like`, {
  //     method: 'POST',
  //   });
  // },
  // // Unlike
  // unlikeCommunityMood: async (moodId: string) => {
  //   return await apiRequest(`/api/community/moods/${moodId}/unlike`, {
  //     method: 'POST',
  //   });
  // },
  // Reply to community mood post
  replyToCommunityMood: async (
    moodId: string,
    replyData: {
      content: string;
      isAnonymous: boolean;
      parentId?: string | null;
    }
  ) => {
    return await apiRequest(`/api/community/moods/${moodId}/reply`, {
      method: 'POST',
      data: replyData,
    });
  },

  // Add interaction
  addInteraction: async (moodId: string, interactionType: string) => {
    return await apiRequest(`/api/community/moods/${moodId}/interaction`, {
      method: 'POST',
      data: { interactionType },
    });
  },

  // Remove interaction
  removeInteraction: async (moodId: string, interactionType: string) => {
    return await apiRequest(`/api/community/moods/${moodId}/interaction`, {
      method: 'DELETE',
      data: { interactionType },
    });
  },
};

export default API_BASE_URL;
