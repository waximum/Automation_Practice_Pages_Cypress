// cypress/e2e/1-getting-started/pageObjects/loginPage.js

export class LoginPage {
    visit() {
      cy.visit('local-pages/login.html');
    }
  
    setEmail(email) {
      cy.get('#email').type(email);
    }
  
    setPassword(password) {
      cy.get('#password').type(password);
    }
  
    submitLogin() {
      cy.get('button[type="submit"]').click();
    }
  
    verifyRedirection() {
      cy.url().should('include', 'index.html');
    }
  
    setRangeValue(value) {
      cy.get('#range').invoke('val', value).trigger('input');
    }
  
    dragAndDrop() {
      const dataTransfer = {
        data: {},
        setData(key, value) { this.data[key] = value; },
        getData(key) { return this.data[key]; },
      };
  
      cy.get('#drag1').trigger('dragstart', { dataTransfer });
      cy.get('#dropzone')
        .trigger('drop', { dataTransfer })
        .trigger('dragend');
    }
  
    verifyElementDropped() {
      cy.get('#dropzone').within(() => {
        cy.get('#drag1').should('exist');
      });
    }
  
    makeTooltipVisible() {
      cy.get('.tooltiptext')
        .invoke('css', 'visibility', 'visible')
        .invoke('css', 'opacity', '1')
        .should('be.visible');
    }
  
    verifyDynamicTableContent(row, column, expectedText) {
      cy.get(`tbody > :nth-child(${row}) > :nth-child(${column})`).then((table) => {
        cy.wrap(table.text()).should('contain', expectedText);
      });
    }
  
    fillDynamicForm(name, age, job) {
      cy.get('#nameInput').type(name);
      cy.get('#ageInput').type(age);
      cy.get('#jobInput').type(job);
      cy.get('form > button').click();
    }
  
    verifyDynamicTableRow(name) {
      cy.get('#dynamicTableBody > tr > :nth-child(1)').then((dynamic) => {
        cy.wrap(dynamic.text()).should('contain', name);
      });
    }
  }
  