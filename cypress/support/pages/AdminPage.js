class AdminPage {
  navigateToAdmin() {
    cy.get('a[href="/web/index.php/admin/viewAdminModule"]')
      .should("be.visible")
      .click();

    cy.url().should("include", "/admin/viewSystemUsers");
  }

  addUser(username, role) {
    // Klik tombol "Add"
    cy.contains("button", "Add").should("be.visible").click();

    // Pilih role: ESS atau Admin
    cy.get(".oxd-select-wrapper").eq(0).click();
    cy.get(".oxd-select-dropdown").should("be.visible").contains(role).click();
    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.get(".oxd-select-dropdown").contains("Enabled").click();
    // Input nama karyawan dan tunggu dropdown muncul
    cy.get('input[placeholder="Type for hints..."]')
      .should("be.visible")
      .clear()
      .type("a", { delay: 1000 }); // atau ketik 'a'
    cy.wait(500);

    // Tunggu sampai dropdown muncul dan siap diklik
    cy.get(".oxd-autocomplete-dropdown").should("exist").and("be.visible");

    // Pastikan minimal 1 item muncul di dropdown
    cy.get(".oxd-autocomplete-dropdown > *", { timeout: 8000 })
      .should("have.length.greaterThan", 0)
      .first()
      .click();

    // Input username
    cy.get(".oxd-input")
      .eq(1) // Gunakan index yang tepat
      .should("be.visible")
      .clear()
      .type(username);

    // Input password & confirm password
    cy.get("input[type='password']")
      .eq(0)
      .should("be.visible")
      .clear()
      .type("Password123!");

    cy.get("input[type='password']")
      .eq(1)
      .should("be.visible")
      .clear()
      .type("Password123!");

    // Klik tombol Save
    cy.contains("button", "Save").should("be.visible").click();

    // Tunggu redirect kembali ke halaman user list
    cy.url({ timeout: 10000 }).should("include", "/admin/viewSystemUsers");
  }
  searchUser(username) {
    cy.visit("/web/index.php/admin/viewSystemUsers");

    // Tunggu input username muncul
    cy.get('input[placeholder="Username"]', { timeout: 10000 }).should(
      "be.visible"
    );

    // Ketik username dan search
    cy.get('input[placeholder="Username"]').clear().type(username);
    cy.contains("button", "Search").should("be.visible").click();

    // Verifikasi hasil tabel mengandung username
    cy.get(".oxd-table-body", { timeout: 10000 }).should(
      "contain.text",
      username
    );
  }
}
export default AdminPage;
