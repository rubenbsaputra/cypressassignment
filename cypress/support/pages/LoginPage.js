class LoginPage {
  login(username, password) {
    cy.get('[name="username"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
  }
}
export default LoginPage;
