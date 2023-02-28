describe('App', () => {
    it("GET API testing Using Cypress API Plugin", () => {
        cy.api("GET", "https://restful-api.dev/").should((response) => {
          expect(response.status).to.eq(200);
          console.log(response.body);
        });
       });
})
