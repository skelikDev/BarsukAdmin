import { createApiInstance } from '@/api/create-api-instance.ts';

export const api = createApiInstance({
  baseURL: 'http://195.49.213.49:8080',
  // version: 'v1',
  timeout: 5000,
  // token: 'initial_token_here',
  logRequests: true,
});
