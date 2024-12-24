import { createApiInstance } from '@/api/create-api-instance.ts';
import { keycloak } from '@/api/keycloak.ts';

const apiInstance = createApiInstance({
  baseURL: 'http://195.49.213.49:8080',
  // version: 'v1',
  timeout: 5000,
  // token: 'initial_token_here',
  logRequests: true,
});

apiInstance.interceptors.request.use(
  async (config) => {
    if (keycloak.token) {
      const isTokenExpired = keycloak.isTokenExpired();
      if (isTokenExpired) {
        await keycloak.updateToken(30);
      }
      config.headers.Authorization = `Bearer ${keycloak.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = apiInstance;
