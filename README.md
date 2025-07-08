
# OrangeHRM Automation Testing with Cypress, Cucumber (BDD), and Page Object Model (POM)

## 📌 Overview

This project automates end-to-end testing on the [OrangeHRM demo site](https://opensource-demo.orangehrmlive.com/) using:
- ✅ Cypress
- ✅ Cucumber (BDD)
- ✅ Page Object Model (POM)

## 🧪 Features Covered
- ✅ Login with valid credentials  
- ✅ Navigate to Admin page  
- ✅ Add a new Admin user with a unique username  
- ✅ Verify the newly added user appears in the user list  

## 🛠️ Project Structure

```
cypress/
│
├── e2e/
│   ├── features/
│   │   └── login_add_user.feature         ← BDD feature file
│   ├── step_definitions/
│   │   └── login_add_user.js              ← Step implementation
│
├── support/
│   └── pages/
│       ├── LoginPage.js                   ← Page Object for Login
│       └── AdminPage.js                   ← Page Object for Admin section
│
cypress.config.js                          ← Cypress config (incl. cucumber)
package.json                               ← Project dependencies
README.md                                  ← You're reading it!
```

## 🧰 Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/orangehrm-cypress-bdd.git
cd orangehrm-cypress-bdd
```

### 2. Install Dependencies
```bash
npm install
```

## ▶️ Run the Tests

### Headless mode
```bash
npx cypress run
```

### Open Cypress Test Runner
```bash
npx cypress open
```

## 📝 Writing Tests in BDD

### Sample Feature: `login_add_user.feature`
```gherkin
Feature: Login and Add Admin Users

  Scenario: User logs in with valid credentials
    Given user is on the login page
    When user logs in as "Admin" with password "admin123"
    Then user should be redirected to dashboard

  Scenario Outline: Add new admin user
    Given user is logged in as "Admin" with "admin123"
    And user navigates to Admin page
    When user adds a new admin "<username>" with role "<role>"
    Then the admin "<username>" should appear in the user list

    Examples:
      | username       | role  |
      | cypressuser1   | ESS   |
      | cypressuser2   | Admin |
```

## 📸 Reporting (optional)

If using `cypress-mochawesome-reporter`:
```bash
npx cypress run --reporter mochawesome
```
Reports will be generated in `cypress/reports/html`.

## 🧠 Tips
- 🔁 To avoid "username already exists", use dynamic usernames (e.g., `cypressuser${Date.now()}`)
- 💤 Use `cy.wait()` or ensure autocomplete dropdowns are visible before selecting them
- 💡 Use `cy.wrap()` and aliases to pass dynamic data between steps

## 👨‍💻 Author

Developed by: Your Name  
Internship QA Automation Project  
Omni App Solutions — 2025

## 📝 License

This project is for educational/demo purposes only.
