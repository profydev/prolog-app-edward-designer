describe("Hero Section", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1440, 900);
    });

    it("has a title and a sub-title", () => {
      cy.get("h1").should("be.visible");
      cy.get("p").should("be.visible");
    });

    it("has a hero image", () => {
      cy.get("img[alt='hero image']").should("be.visible");
    });
  });
});
