context('Restaurants', () => {

    it('get a list of all restaurans', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.LISTRESTAURANTS',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/restaurants/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'LECKER',
                    street: 'Nebenanstraße',
                    streetNumber: '1337',
                    zip: '13370',
                    city: 'Hier',
                    description: 'Lecker Restaurant',
                    phoneNumber: '012312323582374',
                },
                failOnStatusCode: false
            }).then((response) => {
                cy.request({
                    method: 'GET',
                    url: '/v1/restaurants/',
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.length).to.have.at.least(1);
                })
            })
        })
    })


    it('create restaurant', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATEDEPARTMENT',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/restaurants/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'NICHT LECKER',
                    street: 'Nebenanstraße',
                    streetNumber: '1337',
                    zip: '13370',
                    city: 'Hier',
                    description: 'nicht lecker Restaurant',
                    phoneNumber: '012312323582374',
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.name).to.have.equal('NICHT LECKER');
            })
        })
    })

    it('get specific restaurant', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETLISTOFDEPARTMENTS',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/restaurants/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'IMMER NOCH NICHT LECKER',
                    street: 'Nebenanstraße',
                    streetNumber: '1337',
                    zip: '13370',
                    city: 'Hier',
                    description: 'not lecker Restaurant',
                    phoneNumber: '012312323582374',
                },
                failOnStatusCode: false
            }).then((response) => {
                cy.request({
                    method: 'GET',
                    url: '/v1/restaurants/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.name).to.have.equal('IMMER NOCH NICHT LECKER');
                })
            })
        })
    })

    it('update specific restaurant', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.GETLISTOFDEPARTMENTS',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/restaurants/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'IMMER NOCH NICHT LECKER',
                    street: 'Nebenanstraße',
                    streetNumber: '1337',
                    zip: '13370',
                    city: 'Hier',
                    description: 'not lecker Restaurant',
                    phoneNumber: '012312323582374',
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.name).to.have.equal('IMMER NOCH NICHT LECKER');
                cy.request({
                    method: 'POST',
                    url: '/v1/restaurants/',
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'JETZT DOCH LECKER',
                        street: 'Irgendwoanders',
                        streetNumber: '6077',
                        zip: '80550',
                        city: 'Dort',
                        description: 'Restaurant ist ok',
                        phoneNumber: '3245235423151',
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.name).to.have.equal('JETZT DOCH LECKER');
                    expect(response.body.data.street).to.have.equal('Irgendwoanders');
                    expect(response.body.data.streetNumber).to.have.equal('6077');
                    expect(response.body.data.zip).to.have.equal('80550');
                    expect(response.body.data.city).to.have.equal('Dort');
                    expect(response.body.data.description).to.have.equal('Restaurant ist ok');
                    expect(response.body.data.phoneNumber).to.have.equal('3245235423151');
                })
            })
        })
    })
})