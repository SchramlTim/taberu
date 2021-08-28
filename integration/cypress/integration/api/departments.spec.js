context('Deparments', () => {

    it('get a list of all departments', () => {
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
                url: '/v1/departments/',
                headers: {
                    'x-token': loginData.token
                },
                body: {
                    name: 'SCIT',
                    description: 'Cool Desc',
                    location: 'oben links'
                },
                failOnStatusCode: false
            }).then((response) => {
                cy.request({
                    method: 'GET',
                    url: '/v1/departments/',
                    headers: {
                        'x-token': loginData.token
                    },
                    failOnStatusCode: false
                }).then(async(response) => {
                    console.log(response);
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.length).to.have.at.least(1);
                })
            })
        })
    })
})