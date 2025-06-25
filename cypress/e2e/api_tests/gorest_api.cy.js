describe("GoRest API dengan gorestRequest()", () => {
  let userId;

  it("GET - Ambil daftar pengguna", () => {
    cy.gorestRequest("GET", "/users").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });

  it("POST - Buat pengguna baru", () => {
    const newUser = {
      name: "Test User",
      gender: "male",
      email: `testing123@gmail.com`,
      status: "active",
    };

    cy.gorestRequest("POST", "/users", { body: newUser }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.include(newUser);
      userId = response.body.id;
    });
  });

  it("PUT - Perbarui pengguna", () => {
    const updatedData = { name: "Updated Name" };

    cy.gorestRequest("PUT", `/users/${userId}`, { body: updatedData }).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(updatedData.name);
      }
    );
  });

  it("DELETE - Hapus pengguna", () => {
    cy.gorestRequest("DELETE", `/users/${userId}`).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
