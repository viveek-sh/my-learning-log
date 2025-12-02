/// <reference types="cypress" />

describe("Testing Gym Buddy Page", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("https://viveek-sh.github.io/gym-buddy/");
  });

  it("Displays Hero Section", () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.contains("Welcome to GYM Buddy").should("exist");
    cy.contains("Explore Splits").should("exist");
  });
});

describe("Testing Explore CTA on Hero and Page", () => {
  beforeEach(() => {
    cy.visit("https://viveek-sh.github.io/gym-buddy/");
  });
  it("Display Workout Plans", () => {
    cy.contains("Explore Splits").click();
    cy.contains("Choose a Workout Plan").should("exist", { timeout: 10000 });
  });
});

describe("Testing Calculators CTA and Page", () => {
  beforeEach(() => {
    cy.visit("https://viveek-sh.github.io/gym-buddy/");
  });
  it("Display Calculators Page", () => {
    cy.contains("Calculators").click();
    cy.contains("Fitness Calculator").should("exist", { timeout: 10000 });
    cy.contains("BMI Calculator").should("exist");
    cy.get('input[placeholder="Weight (kg)"]').eq(0).type("80");
    cy.get('input[placeholder="Height (cm)"]').eq(0).type("182");
    cy.contains("button", "Calculate BMI").click();
    cy.contains("Your BMI").should("exist", { timeout: 10000 });
  });
});
