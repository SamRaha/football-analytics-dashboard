// describe("Product lookup flow", () => {
//     beforeEach(() => {
//         cy.intercept("GET", "/input-data.json", { fixture: "products.json" }).as("getProducts");
//         cy.visit("/");
//     });

//     it("shows products when I type and click Search", () => {
//         cy.get('input[placeholder="Search by name, ID or description"]').type("pro").should("have.value", "pro");

//         cy.contains("button", "Search").click();
//         cy.wait("@getProducts");
//         cy.contains("AeroEdit for learner pilots").should("be.visible");
//     });

//     it("lets me filter by typing and auto searching", () => {
//         cy.get('input[placeholder="Search by name, ID or description"]').type("analytics").should("have.value", "analytics");
//         cy.wait("@getProducts");

//         cy.contains("Analytics addon").should("be.visible");
//         cy.contains("AeroEdit for learner pilots").should("not.exist");
//     });
// });
