context('Categories', () => {

    it('get a list of all categories', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.LISTOFCAT',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/categories/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'BestCategory'
                },
                failOnStatusCode: false
            }).then((response) => {
                cy.request({
                    method: 'GET',
                    url: '/v1/categories/',
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    console.log(response);
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.length).to.have.at.least(1);
                })
            })
        })
    })


    it('create category', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.CREATECAT',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/departments/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'BestCategory',
                    description: 'Cool Desc',
                    location: 'oben links'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.name).to.have.equal('BestCategory');
            })
        })
    })

    it('get specific category', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.SPECCAT',
            firstName: 'Cy',
            lastName: 'Press',
            password: 'integrationtest',
            phoneNumber: '000000000',
            paypalUsername: 'cypress@integration.paypal',
        }).then((loginData) => {
            cy.request({
                method: 'POST',
                url: '/v1/categories/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'BestCategory'
                },
                failOnStatusCode: false
            }).then((response) => {
                cy.request({
                    method: 'GET',
                    url: '/v1/categories/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.name).to.have.equal('BestCategory');
                })
            })
        })
    })
})