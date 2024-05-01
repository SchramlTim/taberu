context('Orders', () => {

    it('get user list of bowl', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEORDER',
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
            }).then((response) => {
                expect(response.status).equal(200);
                cy.request({
                    method: 'POST',
                    url: '/v1/bowls/' + response.body.data.id + '/orders',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        userId: loginData.user.id,
                        paymentMethod: 'Seitenstraße',
                        finalPrice: 300.10,
                    },
                    failOnStatusCode: false
                }).then((createdResponse) => {
                    expect(createdResponse.status).equal(200);
                    expect(createdResponse.body.data.paymentMethod).equal('Seitenstraße');
                    expect(createdResponse.body.data.finalPrice).equal(300.10);
                    cy.request({
                        method: 'GET',
                        url: '/v1/orders/' + createdResponse.body.data.id,
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {},
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).equal(200);
                        expect(response.body.data.id).eq(createdResponse.body.data.id);
                        expect(response.body.data.paymentMethod).equal('Seitenstraße');
                        expect(response.body.data.finalPrice).equal(300.10);
                    })
                })
            })
        })
    })
})