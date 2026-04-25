import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await api.get(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  /**
   * getSession()
   * 1. Try /auth/me — if access token cookie is valid, backend returns user data
   * 2. If 401 (access token expired) → call /auth/refresh
   *    - Backend verifies refresh token from cookie (Redis lookup)
   *    - Rotates refresh token (old deleted, new one set in cookie)
   *    - Returns { success: true, token: <new accessToken> }
   * 3. If refresh also fails (401/expired) → throw → user = null → force re-login
   */
  getUserSession: async () => {
    try {
      const response = await api.get('/auth/user-me');
      return response.data;
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        const refreshResponse = await api.post('/auth/refresh');
        return refreshResponse.data;
      }
      throw err;
    }
  },

  getAdminSession: async () => {
    try {
      const response = await api.get('/auth/admin-me');
      return response.data;
    } catch (err) {
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        const refreshResponse = await api.post('/auth/refresh-admin');
        return refreshResponse.data;
      }
      throw err;
    }
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  logoutAdmin: async () => {
    const response = await api.post('/auth/logout-admin');
    return response.data;
  }
};
