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

// 请求拦截器
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

// 响应拦截器
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
      // TODO: 业务错误处理
      console.error('API response error:', status, data);
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

// 封装请求方法
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
  // 验证Credential
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

  // 用户注册
  userRegister: async (userData: any) => {
    await apiRequest('/api/auth/register', {
      method: 'POST',
      data: userData,
    });
  },

  // 用户登录
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

  // 验证从回调中获取的token
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
  // 创建心情记录
  createMood: async (moodData: any) => {
    return await apiRequest('/api/moods', {
      method: 'POST',
      data: moodData,
    });
  },
  // 获取心情记录列表
  getMoods: async () => {
    const res = await apiRequest('/api/moods', {
      method: 'GET',
    });
    return res.data;
  },
  // 获取心情记录详情
  getMood: async (moodId: string) => {
    return await apiRequest(`/api/moods/${moodId}`, {
      method: 'GET',
    });
  },
  // 删除心情记录
  deleteMood: async (moodId: string) => {
    return await apiRequest(`/api/moods/${moodId}`, {
      method: 'DELETE',
    });
  },
};

export const communityAPI = {
  // 获取社区话题
  getCommunityTopics: async () => {
    return await apiRequest('/api/community/topics', {
      method: 'GET',
    });
  },
  // 更新在线状态（心跳）
  updateOnlineStatus: async (sessionId?: string) => {
    return await apiRequest('/api/community/online-status/heartbeat', {
      method: 'POST',
      data: { sessionId },
    });
  },
  // 移除在线状态
  removeOnlineStatus: async (sessionId?: string) => {
    return await apiRequest('/api/community/online-status/remove', {
      method: 'POST',
      data: { sessionId },
    });
  },
  // 获取当前在线用户
  getOnlineUsers: async () => {
    return await apiRequest('/api/community/online-users', {
      method: 'GET',
    });
  },
  // 获取社区心情列表
  getCommunityPosts: async () => {
    return await apiRequest('/api/community/moods', {
      method: 'GET',
    });
  },
  // 获取社区心情详情
  getCommunityMood: async (moodId: string) => {
    return await apiRequest(`/api/community/moods/${moodId}`, {
      method: 'GET',
    });
  },
  // 点赞
  // likeCommunityMood: async (moodId: string) => {
  //   return await apiRequest(`/api/community/moods/${moodId}/like`, {
  //     method: 'POST',
  //   });
  // },
  // // 取消点赞
  // unlikeCommunityMood: async (moodId: string) => {
  //   return await apiRequest(`/api/community/moods/${moodId}/unlike`, {
  //     method: 'POST',
  //   });
  // },
  // 回复社区心情
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

  // 添加互动
  addInteraction: async (moodId: string, interactionType: string) => {
    return await apiRequest(`/api/community/moods/${moodId}/interaction`, {
      method: 'POST',
      data: { interactionType },
    });
  },

  // 删除互动
  removeInteraction: async (moodId: string, interactionType: string) => {
    return await apiRequest(`/api/community/moods/${moodId}/interaction`, {
      method: 'DELETE',
      data: { interactionType },
    });
  },
};

export default API_BASE_URL;
