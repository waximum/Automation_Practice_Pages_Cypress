// Importer le module pour drag-and-drop dans Cypress
import 'cypress-drag-drop';

describe('Login Page Tests', () => {
  // Visiter la page de login avant chaque test
  beforeEach(() => {
    cy.visit('local-pages/login.html');
  });

  it('Redirige vers index.html si les champs de login sont corrects', () => {
    // Définir la taille de la fenêtre pour le test
    cy.viewport(1100, 1100);

    // Entrer l'email et le mot de passe
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('12345');

    // Cliquer sur le bouton de connexion et vérifier la redirection vers index.html
    cy.get('button[type="submit"]').click();
    cy.url().should('include', 'index.html');

    // Modifier la valeur du champ de type range et déclencher l'événement
    cy.get('#range')
      .invoke('val', 10) // Ajuster la valeur
      .trigger('input'); // Déclencher l'événement d'entrée pour appliquer la modification

    // Création d'un objet personnalisé pour gérer le drag-and-drop
    const dataTransfer = {
      data: {},
      setData: function (key, value) {
        this.data[key] = value;
      },
      getData: function (key) {
        return this.data[key];
      },
    };

    // Début du drag-and-drop pour l'élément avec l'ID 'drag1'
    cy.get('#drag1').trigger('dragstart', { dataTransfer });

    // Effectuer le drop dans la zone cible et terminer l’action
    cy.get('#dropzone')
      .trigger('drop', { dataTransfer })
      .trigger('dragend');

    // Vérifier que l'élément a bien été déposé dans la zone cible
    cy.get('#dropzone').within(() => {
      cy.get('#drag1').should('exist');
    });

    // Rendre visible un élément tooltip pour vérification
    cy.get('.tooltiptext')
      .invoke('css', 'visibility', 'visible')
      .invoke('css', 'opacity', '1')
      .should('be.visible');

    // Vérifier le contenu d'un tableau dynamique pour la présence du texte 'Jane'
    cy.get('tbody > :nth-child(3) > :nth-child(1)').then((table) => {
      cy.wrap(table.text()).should('contain', 'Jane');
    });

    // Définir des données de test pour les champs dynamiques
    const name = "smith";
    const age = 23;
    const job = 'Engineer';

    // Entrer des valeurs dans les champs de formulaire
    cy.get('#nameInput').type(name);
    cy.get('#ageInput').type(age);
    cy.get('#jobInput').type(job);

    // Soumettre le formulaire
    cy.get('form > button').click();

    // Vérifier que les données soumises sont bien affichées dans le tableau dynamique
    cy.get('#dynamicTableBody > tr > :nth-child(1)').then((dynamic) => {
      cy.wrap(dynamic.text()).should('contain', name);
    });
  });
});