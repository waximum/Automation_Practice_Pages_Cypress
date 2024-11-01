describe('Index Page Tests', () => {
    // Use beforeEach to visit the page before each test
    beforeEach(() => {
      cy.visit('local-pages/index.html');
    });
  
    it('Checks if the page loads successfully', () => {
      cy.contains('Practice Web Elements with Playwright'); // Example check for a specific element
    });
  
    it('Validates the Alert Button functionality', () => {
      cy.contains('Alert Button').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('You clicked the alert button!');
        cy.get('#text').type("adebola")
        cy.get('#password').type('waximum')
        cy.get('#female').check()
        cy.get('#choices').select('Option 3') 
        const date = new Date();
        const currentDate = date.toISOString().split('T')[0];
        cy.get('#date').type(currentDate)
        cy.get('#textarea').type(" I'm a QA and i love automation")
    });
  });
})
  
