import React from "react";
import { mount } from "cypress/react";
import Quiz from "../../client/src/components/Quiz"; // Adjusted relative path

// Mock Questions
const mockQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Lisbon", isCorrect: false },
    ],
  },
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", isCorrect: false },
      { text: "4", isCorrect: true },
      { text: "5", isCorrect: false },
      { text: "6", isCorrect: false },
    ],
  },
];

describe("Quiz Component Tests", () => {
  beforeEach(() => {
    cy.stub(global, "fetch").resolves({
      json: cy.stub().resolves(mockQuestions),
    });
  });

  it("displays the Start Quiz button initially", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("exist");
  });

  it("fetches and displays the first question on start", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.contains("What is the capital of France?", { timeout: 5000 }).should("exist");
  });

  it("displays answer choices", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.get("button").should("have.length", 4); // ✅ Fix: Expect only 4 answer buttons
  });

  it("moves to the next question when an answer is clicked", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.contains("What is the capital of France?", { timeout: 5000 }).should("exist");
    cy.contains("Paris").click();
    cy.contains("What is 2 + 2?", { timeout: 5000 }).should("exist");
  });

  it("shows the final score when all questions are answered", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.contains("Paris").click();
    cy.contains("4").click();
    cy.contains("Quiz Completed", { timeout: 5000 }).should("exist");
    cy.contains("Your score:").should("exist"); // ✅ Dynamic check
  });

  it("allows the user to restart the quiz", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").click();
    cy.contains("Paris").click();
    cy.contains("4").click();
    cy.contains("Take New Quiz").click();
    cy.contains("Start Quiz").should("exist");
  });
});
