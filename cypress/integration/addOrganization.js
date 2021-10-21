/// <reference types="Cypress" />

import { addOrganization } from "../page_object/addOrganizationPage";
import { validEmail, validPassword } from "../fixtures/user_data.json";
import { loginPage } from "../page_object/loginPage";
import { commonElement } from "../page_object/commonElement";



describe ('test to create a new organization', () =>{
    beforeEach ('succesfully login', ()=>{
        cy.visit('/login');
        cy.intercept(
            'POST',
            'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        ).as('loginRedirect')

        loginPage.logIn(validEmail, validPassword);
                   
        cy.wait('@loginRedirect').then((intercept)=>{
            expect(intercept.response.statusCode).eq(200);
            commonElement.organizationHeader.first().should('have.text', 'My Organizations')
            cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations');
        });
    });
    it ('create organization', () =>{ 
        cy.intercept(
            'POST',
            'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations'
        ).as('createdOrganization')
            
        addOrganization.addOrganization('Domaci', 'Tulips.jpg')

        cy.wait('@createdOrganization').then((intercept) =>{
            expect(intercept.response.statusCode).eq(200);
            addOrganization.myOrganizationTitle.should('be.visible').and('have.text','Domaci');
            cy.url().should('contain','/boards')
        });
    });
});

