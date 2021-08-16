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


Cypress.Commands.add('registerUser', (user) => {
    let userLogin = {
        username: user.username,
        password: user.password,
    }

    return cy.request({
        method: 'POST',
        url: '/v1/users/register',
        body: user,
        failOnStatusCode: true
    }).then((response) => {
        return response.body.data;
    });
})

Cypress.Commands.add('loginUser', (user) => {
    let userLogin = {
        username: user.username,
        password: user.password,
    }

    return cy.request({
        method: 'POST',
        url: '/v1/users/login',
        body: userLogin,
        failOnStatusCode: true
    });
})

Cypress.Commands.add('registerUserIfNotExist', (user) => {
    let userLogin = {
        username: user.username,
        password: user.password,
    }

    return cy.request({
        method: 'POST',
        url: '/v1/users/login',
        body: userLogin,
        failOnStatusCode: false
    }).then((response) => {
        if (response.status === 200) {
            return response.body.data.user;
        }
        return cy.request({
            method: 'POST',
            url: '/v1/users/register',
            body: user,
            failOnStatusCode: false
        }).then((response) => {
            return response.body.data;
        });
    })
})
