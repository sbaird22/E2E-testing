import React from "react";
import { mount } from "cypress/react";
import Quiz from "../../client/src/components/Quiz";

describe("Quiz Component Tests", () => {
  beforeEach(() => {
    cy.fixture("questions.json").as("mockQuestions"); 
  });

  it("renders the Start Quiz button", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("be.visible");
  });
  it("starts quiz and displays first question", () => {
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as("getQuestions");
    mount(<Quiz />);
  
    cy.contains("Start Quiz").click(); // Click start quiz
    cy.wait("@getQuestions"); // Wait for the mock API response
  
    cy.get("h2").should("contain", "What is the capital of France?"); // First question should appear
  });
  it("displays answer choices after loading the first question", () => {
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as("getQuestions");
    mount(<Quiz />);
  
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
  
    cy.get(".alert-secondary").should("have.length", 4); // 4 answer choices
  });
  it("moves to next question when an answer is clicked", () => {
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as("getQuestions");
    mount(<Quiz />);
  
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
  
    cy.get("button").eq(1).click(); 
    cy.get("h2").should("contain", "What is 2 + 2?"); // Next question should load
  });
  it("shows final score after completing the quiz", () => {
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as("getQuestions");
    mount(<Quiz />);
  
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
  
    cy.get("button").eq(1).click(); // Click **any** answer for Q1
    cy.get("button").eq(2).click(); // Click **any** answer for Q2
    cy.wait(500);
    cy.contains("Quiz Completed").should("be.visible");
    cy.contains(/^Your score: \d+\/\d+$/).should("exist").and("be.visible");
  });
  it("allows the user to restart the quiz", () => {
    cy.intercept("GET", "/api/questions/random", { fixture: "questions.json" }).as("getQuestions");
    mount(<Quiz />);
  
    cy.contains("Start Quiz").click();
    cy.wait("@getQuestions");
  
    cy.get("button").eq(1).click();
    cy.get("button").eq(2).click();

    cy.contains("Quiz Completed").should("exist"); // ✅ Ensure quiz ended

    cy.contains("Take New Quiz").click(); // ✅ Click restart button
  
    cy.wait("@getQuestions"); // ✅ Ensure API is called again
  
    // ✅ Check that the first question appears instead of "Start Quiz"
    cy.get("h2").should("contain", "What is the capital of France?"); 
  
    // ✅ Ensure new answer choices appear
    cy.get(".alert-secondary").should("have.length", 4);
  });
   
  
});
