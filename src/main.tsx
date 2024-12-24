import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { keycloak } from '@/api/keycloak.ts';

createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <StrictMode>
      <App />
    </StrictMode>
  </ReactKeycloakProvider>
);
