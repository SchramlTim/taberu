/// <reference types="cypress" />

context('Bowls', () => {

    it('login user can create bowl', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEBOWL',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/bowls/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Bowl EUW',
                    description: 'Cool Description',
                    orderDeadline: '2021-09-01 00:00:00',
                    arriveDate: '2021-09-15 06:00:00',
                    arriveDate: '2021-09-15 06:00:00',
                    menuId: 1,
                },
                failOnStatusCode: false
            }).then(async(response) => {
                console.log(response);
                expect(response.status).equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.data.name).eq('Best Bowl EUW');
            })
        })
    })

    it('login user can update bowl', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEBOWL',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/bowls/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Bowl EUW',
                    description: 'Cool Description',
                    orderDeadline: '2021-09-01 00:00:00',
                    arriveDate: '2021-09-15 06:00:00',
                    menuId: 1,
                },
                failOnStatusCode: false
            }).then(async(response) => {
                console.log(response);
                expect(response.status).equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.data.name).eq('Best Bowl EUW');
                expect(response.body.data.description).eq('Cool Description');
                expect(response.body.data.orderDeadline).eq('2021-09-01 00:00:00');
                expect(response.body.data.arriveDate).eq('2021-09-15 06:00:00');
                expect(response.body.data.menuId).eq(1);

                cy.request({
                    method: 'PATCH',
                    url: '/v1/bowls/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'WORST Bowl EUW',
                        description: 'uff',
                        orderDeadline: '2020-09-01 00:00:00',
                        arriveDate: '2020-09-15 06:00:00',
                        menuId: 2,
                    },
                    failOnStatusCode: false
                }).then(async(response) => {
                    console.log(response);
                    expect(response.status).equal(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body.data.name).eq('WORST Bowl EUW');
                    expect(response.body.data.description).eq('uff');
                    expect(response.body.data.orderDeadline).eq('2020-09-01 00:00:00');
                    expect(response.body.data.arriveDate).eq('2020-09-15 06:00:00');
                    expect(response.body.data.menuId).eq(2);
                })
            })
        })
    })
})