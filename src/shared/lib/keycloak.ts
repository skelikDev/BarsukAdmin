import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://195.49.213.49:8081/', // URL вашего Keycloak сервера
  realm: 'barsuk-admin', // Ваш realm
  clientId: 'barsuk-admin-front', // Ваш клиент
});

export default keycloak;