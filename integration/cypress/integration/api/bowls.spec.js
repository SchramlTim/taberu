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
            }).then((response) => {
                console.log(response);
                expect(response.status).equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.data.name).eq('Best Bowl EUW');
            })
        })
    })

    it('login user can update bowl', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.UPDATEBOWL',
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
                }).then((response) => {
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


    it('get list of all bowl', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETLISTOFBOWLS',
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
                    method: 'GET',
                    url: '/v1/bowls',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.length).to.have.at.least(1);
                })
            })
        })
    })

    it('get specific bowl', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETSPECIFICBOWL',
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
                    method: 'GET',
                    url: '/v1/bowls/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body.data.name).eq('Best Bowl EUW');
                    expect(response.body.data.description).eq('Cool Description');
                    expect(response.body.data.orderDeadline).eq('2021-09-01 00:00:00');
                    expect(response.body.data.arriveDate).eq('2021-09-15 06:00:00');
                    expect(response.body.data.menuId).eq(1);
                })
            })
        })
    })

    it('create order in bowl', () => {
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
                }).then((response) => {
                    console.log(response);
                    expect(response.status).equal(200);
                    expect(response.body.data.paymentMethod).equal('Seitenstraße');
                    expect(response.body.data.finalPrice).equal(300.10);
                })
            })
        })
    })

    it('update order in bowl', () => {
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
                }).then((response) => {
                    expect(response.status).equal(200);
                    expect(response.body.data.paymentMethod).equal('Seitenstraße');
                    expect(response.body.data.finalPrice).equal(300.10);
                    cy.request({
                        method: 'PATCH',
                        url: '/v1/bowls/' + response.body.data.id + '/orders/' + response.body.data.id,
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {
                            paymentMethod: 'Brücke',
                            paymentStatus: 'DONE',
                            finalPrice: 1337.00,
                            orderStatus: 'ISCH DA',
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        console.log(response);
                        expect(response.status).equal(200);
                        expect(response.body.data.paymentMethod).equal('Brücke');
                        expect(response.body.data.paymentStatus).equal('DONE');
                        expect(response.body.data.orderStatus).equal('ISCH DA');
                        expect(response.body.data.finalPrice).equal(1337.00);
                    })
                })
            })
        })
    })

    it('delete order in bowl', () => {
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
                }).then((response) => {
                    cy.request({
                        method: 'DELETE',
                        url: '/v1/bowls/' + response.body.data.id + '/orders/' + response.body.data.id,
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {},
                    }).then((response) => {
                        expect(response.status).equal(202);
                    })
                })
            })
        })
    })

    it('add user to bowl', () => {
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
                    url: '/v1/bowls/' + response.body.data.id + '/users',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        userId: loginData.user.id
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                })
            })
        })
    })

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
                    url: '/v1/bowls/' + response.body.data.id + '/users',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        userId: loginData.user.id
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    cy.request({
                        method: 'GET',
                        url: '/v1/bowls/' + response.body.data.id + '/users',
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {},
                        failOnStatusCode: false
                    }).then((response) => {
                        console.log(response);
                        expect(response.status).equal(200);
                        expect(response.body.data.length).eq(1)
                        expect(response.body.data.shift().id).eq(loginData.user.id);
                    })
                })
            })
        })
    })

    it('remove user from bowl', () => {
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
                    url: '/v1/bowls/' + response.body.data.id + '/users',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        userId: loginData.user.id
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    cy.request({
                        method: 'DELETE',
                        url: '/v1/bowls/' + response.body.data.id + '/users/' + loginData.user.id,
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {},
                        failOnStatusCode: false
                    }).then((response) => {
                        console.log(response);
                        expect(response.status).equal(202);
                    })
                })
            })
        })
    })
})