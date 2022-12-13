describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("footer links are working", () => {
      // check that each link leads to the correct page
      cy.get("footer").contains("Docs").should("have.attr", "href", "/docs");

      cy.get("footer").contains("API").should("have.attr", "href", "/api");

      cy.get("footer").contains("Help").should("have.attr", "href", "/help");

      cy.get("footer")
        .contains("Community")
        .should("have.attr", "href", "/community");
    });

    it("has the correct version number", () => {
      cy.get("footer").contains(
        `Version: ${Cypress.env("NEXT_PUBLIC_APP_VERSION")}`
      );
    });

    it("has the logo as background", () => {
      cy.get("footer span")
        .last()
        .invoke("css", "background-image")
        .should("contain", "/icons/logo-small.svg");
    });
  });

  context("mobile resolution", () => {
    beforeEach(() => {
      cy.viewport("iphone-8");
    });
    it("version should have an order property", () => {
      cy.get("footer").contains("Version:").should("have.css", "order", "1");
    });
  });
});
