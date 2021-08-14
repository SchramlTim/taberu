/// <reference types="cypress" />

context('Users', () => {

  it('register User',()=>{
    let user = {
      username: 'cypress@integration.test',
      firstName: 'Cy',
      lastName: 'Press',
      password: 'integrationtest',
      phoneNumber: '000000000',
      paypalUsername: 'cypress@integration.paypal',
    }

    cy.request('POST','/v1/users/register', user).then((response)=>{
      expect(response.status).equal(201)
      expect(response.body.name).equal(user.name)
      expect(response.body.job).equal(user.job)

    })
  })

  it('GET-list user',()=>{
    cy.request('GET','/v1/users').then((response)=>{
      expect(response.status).equal(200)
      expect(response.body).to.not.be.null
      expect(response.body.data.length).to.have.at.least(1);
    })
  })
})
