import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if a refresh is already in progress to avoid multiple refresh calls
let isRefreshing = false;
// Queue of failed requests waiting for refresh to complete
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor — catches 401 on ANY API call
api.interceptors.response.use(
  (response) => response, // pass through success responses
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401, and avoid infinite loop on the refresh call itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/login')
    ) {
      if (isRefreshing) {
        // Queue the request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Check if we should use admin refresh or user refresh
        // We can check cookies (if accessible) or just try admin first if on admin paths
        const isAdmin = document.cookie.includes('admin_accesstoken') || document.cookie.includes('admin_refreshtoken');
        const refreshUrl = isAdmin ? '/auth/refresh-admin' : '/auth/refresh';
        
        await api.post(refreshUrl);
        processQueue(null);
        return api(originalRequest); // retry original request with new token
      } catch (refreshError) {
        // Refresh failed — session is truly expired → force logout
        processQueue(refreshError);
        // Clear user state and redirect to login
        window.dispatchEvent(new CustomEvent('auth:logout'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
