context('Menus', () => {

    it('create menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEMENU',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                console.log(response);
                expect(response.status).equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.data.name).eq('Best Menu NA');
                expect(response.body.data.creatorId).eq(loginData.user.id);
                expect(response.body.data.description).eq('Cool Description');
            })
        })
    })

    it('update menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.UPDATEMENU',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200);
                expect(response.body).to.not.be.null;
                expect(response.body.data.name).eq('Best Menu NA');
                expect(response.body.data.description).eq('Cool Description');

                cy.request({
                    method: 'PATCH',
                    url: '/v1/menus/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'Worst Menu NA',
                        description: 'Worst Description'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body.data.name).eq('Worst Menu NA');
                    expect(response.body.data.description).eq('Worst Description');
                })
            })
        })
    })


    it('get list of all menus', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETLISTOFMENUS',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200);
                cy.request({
                    method: 'GET',
                    url: '/v1/menus',
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

    it('get specific menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETSPECIFICMENU',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200);
                cy.request({
                    method: 'GET',
                    url: '/v1/menus/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                    expect(response.body).to.not.be.null;
                    expect(response.body.data.name).eq('Best Menu NA');
                    expect(response.body.data.description).eq('Cool Description');
                })
            })
        })
    })

    it('delete item in menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEMENUITEM',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200);
                cy.request({
                    method: 'DELETE',
                    url: '/v1/menus/' + response.body.data.id,
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

    it('create menu items in menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEMENUITEM',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200);
                cy.request({
                    method: 'POST',
                    url: '/v1/menus/' + response.body.data.id + '/items',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'Cool Item',
                        description: 'Cool Description yo',
                        price: 1337.01,
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    console.log(response);
                    expect(response.status).equal(200);
                    expect(response.body.data.name).equal('Cool Item');
                    expect(response.body.data.description).equal('Cool Description yo');
                    expect(response.body.data.price).equal(1337.01);
                })
            })
        })
    })

    it('update item in menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.UPDATEITEM',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200);
                cy.request({
                    method: 'POST',
                    url: '/v1/menus/' + response.body.data.id + '/items',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'Cool Item',
                        description: 'Cool Description yo',
                        price: 1337.01,
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                    expect(response.body.data.name).equal('Cool Item');
                    expect(response.body.data.description).equal('Cool Description yo');
                    expect(response.body.data.price).equal(1337.01);

                    cy.request({
                        method: 'PATCH',
                        url: '/v1/menus/' + response.body.data.id + '/items/' + response.body.data.id,
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {
                            name: 'Uff Item',
                            description: 'yolo Description yo',
                            price: 6077.01,
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).equal(200);
                        expect(response.body.data.name).equal('Uff Item');
                        expect(response.body.data.description).equal('yolo Description yo');
                        expect(response.body.data.price).equal(6077.01);
                    })
                })
            })
        })
    })

    it('delete item in menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEMENUITEM',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((menuResponse) => {
                expect(menuResponse.status).equal(200);
                cy.request({
                    method: 'POST',
                    url: '/v1/menus/' + menuResponse.body.data.id + '/items',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'Cool Item',
                        description: 'Cool Description yo',
                        price: 1337.01,
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                    cy.request({
                        method: 'DELETE',
                        url: '/v1/menus/' + menuResponse.body.data.id + '/items/' + response.body.data.id,
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

    it('get list of items which be part of menu', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEMENUITEM',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/menus/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    creatorId: loginData.user.id,
                    name: 'Best Menu NA',
                    description: 'Cool Description'
                },
                failOnStatusCode: false
            }).then((menuResponse) => {
                expect(menuResponse.status).equal(200);
                cy.request({
                    method: 'POST',
                    url: '/v1/menus/' + menuResponse.body.data.id + '/items',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'Cool Item',
                        description: 'Cool Description yo',
                        price: 1337.01,
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200);
                    cy.request({
                        method: 'GET',
                        url: '/v1/menus/' + menuResponse.body.data.id + '/items',
                        headers: {
                            'x-token': loginData.token
                        },
                        body: {},
                        failOnStatusCode: false
                    }).then((response) => {
                        console.log(response);
                        expect(response.status).equal(200);
                        expect(response.body.data.length).eq(1)
                        expect(response.body.data.length).to.have.at.least(1)
                    })
                })
            })
        })
    })
})