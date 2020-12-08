/**
 * @FYI https://deepexi.yuque.com/docs/share/6537d0c9-6d70-4302-a37d-ba388fd74a15?# 《Cypress 实战总结》
 */
describe('login', function () {
  before(() => {
    cy.fixture('user').as('user')

    cy.visit('/')
  })

  it('login', function () {
    const {code, username, password} = this.user

    cy.hash().should('eq', '#/login?redirect=%2F')

    cy.get('input[placeholder=租户Id]').type(code)
    cy.get('input[placeholder="用户名 / 邮箱"]').fill(username)
    cy.get('input[placeholder=密码]').fill(`${password}{enter}`)
    // cy.contains('登录').click() // enter 代替 click
    cy.hash().should('eq', '#/')
  })
})
