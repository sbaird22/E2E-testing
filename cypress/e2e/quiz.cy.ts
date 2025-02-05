describe("E2E - Tech Quiz", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001"); 
    cy.intercept("GET", "/api/questions/random").as("getQuestions");
  });

  it("should display Start Quiz button on load", () => {
    cy.contains("Start Quiz").should("be.visible"); // ✅ Ensure button loads
  });

  it("should start the quiz when Start Quiz is clicked", () => {
    cy.contains("Start Quiz").click();
    cy.pause();
    cy.wait("@getQuestions"); // ✅ Wait for API call
    cy.get("h2", { timeout: 5000 }).should("exist"); // ✅ Ensure first question appears
  });

  it("should move to the next question when an answer is clicked", () => {
    cy.get("button").eq(1).click(); // ✅ Click first answer
    cy.wait(1000); // 🔹 Allow UI update
    cy.get("h2").should("not.contain", "What is the capital of France?"); // ✅ Ensure new question appears
  });

  it("should display final score when quiz is completed", () => {
    cy.pause();
    cy.get("button").eq(1).click(); // ✅ Answer Q1
    cy.wait(500);
    cy.get("button").eq(2).click(); // ✅ Answer Q2
    cy.wait(500);

    cy.contains("Quiz Completed", { timeout: 7000 }).should("be.visible"); // ✅ Ensure quiz completion
    cy.pause();
    cy.contains(/^Your score: \d+\/\d+$/).should("exist").and("be.visible"); // ✅ Check score format
    cy.pause();
  });

  it("should restart quiz when Take New Quiz is clicked", () => {
    cy.contains("Take New Quiz", { timeout:7000}).click(); // ✅ Restart
    cy.pause();

    cy.wait("@getQuestions"); // ✅ Ensure new questions load
    cy.wait(500);
    cy.get("h2").should("contain", "What is"); // ✅ Ensure quiz restarted
  });
});
