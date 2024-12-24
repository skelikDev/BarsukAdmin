import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'https://195.49.213.49:8443/',
  realm: 'barsuk-admin',
  clientId: 'barsuk-admin-front',
});
