import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../support/pages/LoginPage";
import AdminPage from "../../support/pages/AdminPage";

const loginPage = new LoginPage();
const adminPage = new AdminPage();

Given("user is on the login page", () => {
  cy.visit("/");
});

When("user logs in using username {string} and password {string}", (username, password) => {
  loginPage.login(username, password);
});

Then("user should see the dashboard page", () => {
  cy.url().should("include", "/dashboard");
});

Given("user is logged in as {string} with {string}", (username, password) => {
  cy.visit("/");
  loginPage.login(username, password);
});

When("user navigates to Admin page", () => {
  adminPage.navigateToAdmin();
});

When("user adds a new admin {string} with role {string}", (newUser, role) => {
  adminPage.addUser(newUser, role);
});

Then("the admin {string} should appear in the user list", (username) => {
  adminPage.searchUser(username);
});
