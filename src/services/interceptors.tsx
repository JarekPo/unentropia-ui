'use client';

import {unentropiaApiInstance} from './instances';
unentropiaApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest?.url?.includes('/auth/google/refresh')) {
      // obligatory login temporarily disabled
      // window.location.href = '/login';
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await unentropiaApiInstance.post('/auth/google/refresh');
        return unentropiaApiInstance(originalRequest);
      } catch (refreshError) {
        // obligatory login temporarily disabled
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
