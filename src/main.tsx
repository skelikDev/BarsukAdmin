import { createRoot } from 'react-dom/client';
import keycloak from './shared/lib/keycloak.ts';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { App } from './app';
import './index.css';


createRoot(document.getElementById('root')!).render(
      <ReactKeycloakProvider authClient={keycloak}>
        <App/>
      </ReactKeycloakProvider>,
);
