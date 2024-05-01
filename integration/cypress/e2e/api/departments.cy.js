context('Deparments', () => {

    it('get a list of all departments', () => {
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
                }).then((response) => {
                    console.log(response);
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.length).to.have.at.least(1);
                })
            })
        })
    })


    it('create department', () => {
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
                    name: 'RSCIT',
                    description: 'Cool Desc',
                    location: 'oben links'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.name).to.have.equal('RSCIT');
            })
        })
    })


    it('update department', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.UPDATEDEPARTMENT',
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
                    name: 'SillyDepartment',
                    description: 'Cool Desc',
                    location: 'oben links'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.name).to.have.equal('SillyDepartment');
                cy.request({
                    method: 'PATCH',
                    url: '/v1/departments/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {
                        name: 'UPDATEDEPARTMENT',
                        description: 'Cool Desc',
                        location: 'oben links'
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(200)
                    expect(response.body).to.not.be.null
                    expect(response.body.data.name).to.have.equal('UPDATEDEPARTMENT');
                })
            })
        })
    })

    it('delete department', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.DELETEDEPARTMENT',
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
                    name: 'SillyDepartment',
                    description: 'Cool Desc',
                    location: 'oben links'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).equal(200)
                expect(response.body).to.not.be.null
                expect(response.body.data.name).to.have.equal('SillyDepartment');
                cy.request({
                    method: 'DELETE',
                    url: '/v1/departments/' + response.body.data.id,
                    headers: {
                        'x-token': loginData.token
                    },
                    body: {},
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).equal(202)
                })
            })
        })
    })

    it('get a list of all department users', () => {
        cy.registerAndLoginUser({
            username: 'cypress@integration.DEPUSERLIST',
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
                    name: 'LISTIT',
                    description: 'Cool Desc',
                    location: 'oben links'
                },
                failOnStatusCode: false
            }).then((response) => {
                cy.request({
                    method: 'GET',
                    url: '/v1/departments/' + response.body.data.id + '/users',
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

})