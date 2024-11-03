// cypress/e2e/1-getting-started/login.cy.js
// Correct import path based on the folder structure in the screenshot
import { LoginPage } from './PageObject/loginPage';


describe('Login Page Tests', () => {
  const loginPage = new LoginPage();
  const name = "smith";
  const age = 23;
  const job = 'Engineer';

  beforeEach(() => {
    loginPage.visit();
  });

  it('Redirige vers index.html si les champs de login sont corrects', () => {
    cy.viewport(1100, 1100);

    loginPage.setEmail('test@example.com');
    loginPage.setPassword('12345');
    loginPage.submitLogin();
    loginPage.verifyRedirection();

    loginPage.setRangeValue(10);
    loginPage.dragAndDrop();
    loginPage.verifyElementDropped();

    loginPage.makeTooltipVisible();
    loginPage.verifyDynamicTableContent(3, 1, 'Jane');

    loginPage.fillDynamicForm(name, age, job);
    loginPage.verifyDynamicTableRow(name);
  });
});
