export const environment = {
  production: false,
  api: {
    serverUrl: 'http://localhost:8000',
  },
  auth0: {
    domain: 'dev-6jazrsornprva7fs.us.auth0.com',
    clientId: 'bjPl70YDQnw5cj5Wguo5hrgWc3eEACAr',
    authorizationParams: {
      audience: 'https://hello-world.example.com',
      redirect_uri: 'http://localhost:4200/callback',
    },
    errorPath: '/callback',
  },
};
