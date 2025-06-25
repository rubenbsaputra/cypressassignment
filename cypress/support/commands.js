// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("apiRequest", (method, endpoint, options = {}) => {
  cy.request({
    method,
    url: `${Cypress.env("baseUrl") || "https://reqres.in/api"}${endpoint}`,
    headers: {
      "x-api-key": "reqres-free-v1",
      ...options.headers,
    },
    body: options.body,
    ...options,
  });
});

//Assignment Dibawah
Cypress.Commands.add("gorestRequest", (method, endpoint, options = {}) => {
  cy.request({
    method,
    url: `https://gorest.co.in/public/v2${endpoint}`,
    headers: {
      Authorization: Cypress.env("token"),
      ...options.headers,
    },
    body: options.body,
    ...options,
  });
});
