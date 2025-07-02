describe("OrangeHRM E2E Test", () => {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });

  it("1. Screenshot Dashboard", () => {
    cy.wait(1000)
    cy.screenshot("01_dashboard");
  });

  it("2. Access Admin menu and validate page", () => {
    cy.contains("Admin").should("be.visible").click();
    cy.url().should("include", "/admin/viewSystemUsers");

    // Perbaikan teks validasi
    cy.get("h6").should("contain.text", "User Management");

    cy.screenshot("02_admin_page");
  });

  it("3. Add Admin user", () => {
    const newUsername = "newadmin" + Date.now();

    // Klik menu Admin
    cy.contains("Admin").should("be.visible").click();

    // Klik tombol Add
    cy.contains("Add").should("be.visible").click();

    // Isi form
    cy.get("form").within(() => {
      // User Role
      cy.get("div.oxd-select-text").eq(0).click();
      cy.contains("Admin").click();

      // Employee Name
      cy.get('input[placeholder="Type for hints..."]').type("Amelia");
      cy.wait(1500); // biar dropdown muncul

      cy.get(".oxd-autocomplete-dropdown")
        .should("not.contain.text", "No Records Found")
        .find(".oxd-autocomplete-option")
        .first()
        .click();

      // Status
      cy.get("div.oxd-select-text").eq(1).click();
      cy.contains("Enabled").click();

      // Username & password
      cy.get('input[autocomplete="off"]').eq(0).type(newUsername);
      cy.get('input[type="password"]').eq(0).type("Password123!");
      cy.get('input[type="password"]').eq(1).type("Password123!");
    });

    // Intercept POST request saat klik Save
    cy.intercept("POST", "/web/index.php/api/v2/admin/users").as("postUser");

    // Klik Save
    cy.contains("Save").click();

    // Tunggu sampai request selesai dan redirect berjalan
    cy.wait("@postUser");
    cy.wait(5000); // tambahkan wait ekstra kalau redirect lambat

    cy.url({ timeout: 10000 }).should("include", "/admin/viewSystemUsers");

    // Cari user baru
    cy.get('input[placeholder="Search"]').should("be.visible");
    cy.get('input[placeholder="Search"]').type(newUsername);
    cy.get('button[type="submit"]').click();

    // Verifikasi hasil
    cy.contains(newUsername).should("exist");
    cy.screenshot("03_added_user");
  });
});
