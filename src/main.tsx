import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@/api/generated/requests/services.gen.ts';

client.setConfig({
    baseUrl: "YOUR_BASE_URL",
    throwOnError: true, // If you want to handle errors on `onError` callback of `useQuery` and `useMutation`, set this to `true`
});

client.interceptors.request.use((config) => {
    // Add your request interceptor logic here
    return config;
});

client.interceptors.response.use((response) => {
    // Add your response interceptor logic here
    return response;
});

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </StrictMode>,
)
