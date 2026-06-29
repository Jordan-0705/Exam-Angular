// environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  paymentUrl: 'http://localhost:8081'
};

// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.badwallet.com',
  paymentUrl: 'https://payment.badwallet.com'
};