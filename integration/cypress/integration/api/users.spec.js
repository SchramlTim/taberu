/// <reference types="cypress" />

context('Users', () => {

    it.skip('register user', () => {
        let userRegister = {
            username: 'cypress@integration.yolo',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }

        cy.request('POST', '/v1/users/register', userRegister).then((response) => {
            expect(response.status).equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body.data.id).is.not.null;

            cy.request('DELETE', '/v1/users/' + response.body.data.id).then((response) => {
                expect(response.status).equal(202);
            });
        });
    })

    it('get a list of all registered users', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETLIST',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'GET',
                url: '/v1/users/',
                headers: {
                    'x-token': loginData.token
                },
                failOnStatusCode: false
            }).then(async(response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.length).to.have.at.least(1);
                cy.request({
                    method: 'DELETE',
                    url: '/v1/users/' + loginData.user.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then(async(response) => {
                    expect(response.status).equal(202);
                });
            })
        })
    })

    it('get specific user from list registered users', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.SPECIFIC',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'GET',
                url: '/v1/users/' + loginData.user.id,
                headers: {
                    'x-token': loginData.token
                },
                failOnStatusCode: false
            }).then(async(response) => {
                expect(response.status).equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.data.username).eq(loginData.user.username);

                cy.request({
                    method: 'DELETE',
                    url: '/v1/users/' + loginData.user.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then(async(response) => {
                    expect(response.status).equal(202);
                });
            })
        })
    })

    it('delete user', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.DELETEUSER',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'DELETE',
                url: '/v1/users/' + loginData.user.id,
                headers: {
                    'x-token': loginData.token
                },
                failOnStatusCode: false
            }).then(async(response) => {
                expect(response.status).equal(202);
            });
        });
    })
})