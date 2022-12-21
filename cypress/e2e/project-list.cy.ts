import capitalize from "lodash/capitalize";
import mockProjects from "../fixtures/projects.json";

import { ProjectStatus, ProjectStatusText } from "../../api/projects.types";

describe("Project List", () => {
  beforeEach(() => {
    // setup request mock
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    // wait for request to resolve
    cy.wait("@getProjects");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("renders the projects", () => {
      const languageNames = ["React", "Node.js", "Python"];

      // get all project cards
      cy.get("main")
        .find("li")
        .each(($el, index) => {
          // check that project data is rendered
          cy.wrap($el).contains(mockProjects[index].name);
          cy.wrap($el).contains(languageNames[index]);
          cy.wrap($el).contains(mockProjects[index].numIssues);
          cy.wrap($el).contains(mockProjects[index].numEvents24h);
          cy.wrap($el).contains(
            capitalize(
              ProjectStatus[mockProjects[index].status as ProjectStatusText]
            )
          );
          cy.wrap($el)
            .find("a")
            .should(
              "have.attr",
              "href",
              `/dashboard/issues?project=${encodeURIComponent(
                mockProjects[index].name.toLowerCase()
              )}`
            );
        });
    });
  });
});

describe("Spinner", () => {
  it("should show spinner and hide it when data is shown", () => {
    cy.intercept("GET", "https://prolog-api.profy.dev/project", (req) => {
      req.reply({
        statusCode: 200,
        delay: 2000,
        fixture: "projects.json",
      });
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");

    cy.get('[data-cy="spinner"]')
      .should("be.visible")
      .then(() => {
        // wait for request to resolve
        cy.wait("@getProjects");
        cy.get('[data-cy="spinner"]').should("not.exist");
        cy.get("a").contains("View issues");
      });
  });
});

describe("Error", () => {
  it("should show error in case data is not loaded", () => {
    cy.intercept("https://prolog-api.profy.dev/project", {
      forceNetworkError: true,
    }).as("getProjects");

    // open projects page
    cy.visit("http://localhost:3000/dashboard");
    cy.wait(10000).then(() => {
      cy.get("button").should("contain", "Try again");
      cy.get("div").should(
        "contain",
        "There was a problem while loading the project data"
      );
    });
  });
});
