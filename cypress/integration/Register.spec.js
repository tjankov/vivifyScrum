/// <reference types="Cypress" />

import { registrationPage } from './../page_object/registrationPage';
import { validEmail, validPassword, numOfUsers} from './../fixtures/user_data.json';
import { commonElement } from '../page_object/commonElement';

const faker = require ('faker');
let randomEmail = faker.internet.email();


describe ('test registration feature', () => {
    beforeEach ('visit home page', () =>{
        cy.intercept(
            'GET',
            'https://cypress-api.vivifyscrum-stage.com/pricing'
        ).as('registration');

        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing');
        registrationPage.freeSingUpButton.click({force:true});
        
        cy.wait ('@registration').then (() =>{
            cy.url().should('contain', '/sign-up');
            registrationPage.registrationHeading.should('have.text', 'Account Details:');
        });      
    });

    //NEGATIVE TEST CASES

    it ('register with all spaces', () =>{
        registrationPage.registerInvoke(' ', ' ', ' ');
        commonElement.errorMessage.eq(0).should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.eq(1).should('be.visible').and('have.text','The password field is required');
        commonElement.errorMessage.eq(2).should('be.visible').and('have.text','The number of users field is required')
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    it ('register without email provided', () =>{
        registrationPage.registerInvoke('', validPassword, numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email', {force: true});
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');

    });

    it ('register wit already existing email', () =>{
        registrationPage.register(validEmail, validPassword,numOfUsers);
        registrationPage.popOutMessage.should('be.visible');
        registrationPage.popOutMessage.should('have.css', 'color', 'rgb(131, 145, 165)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');

    });

    it ('register with invalid email - "@" is missing', () =>{
        registrationPage.register('tamarajankov.com', validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    it ('register with invalid email - "." is missing', () =>{
        registrationPage.register('tamara@jankovcom', validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    //Ne znam kako da cypress prepozna prazan string
    it ('register with invalid email - starting with space', () =>{
        registrationPage.registerInvoke(' '+randomEmail, validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    //Ne znam kako da cypress prepozna prazan string
    it ('register with invalid email - space at the end', () =>{
        registrationPage.registerIvnoke(randomEmail+' ', validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    it ('register with invalid email - space after @', () =>{
        registrationPage.registerInvoke('tamara@ jankov.com ', validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    it ('register with invalid email - space before @', () =>{
        registrationPage.registerInvoke('tamara @jankov.com ', validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    });

    it ('register without password provided', () =>{
        registrationPage.registerInvoke(validEmail, '',numOfUsers)
        commonElement.errorMessage.should('be.visible').and('have.text','The password field is required');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 

    it ('register with all spaces in password', () =>{
        registrationPage.registerInvoke(validEmail, '     ',numOfUsers)
        commonElement.errorMessage.should('be.visible').and('have.text','The password field is required');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 

     it ('register with 3 credentials in password', () =>{
        registrationPage.register(validEmail, '123',numOfUsers)
        commonElement.errorMessage.should('be.visible').and('have.text','The password field must be at least 5 characters');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 
        
    it ('register without number of users provided', () =>{
        registrationPage.registerInvoke(validEmail, validPassword,'');
        commonElement.errorMessage.should('be.visible').and('have.text','The number of users field is required');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 

    it ('register with 0 number of users', () =>{
        registrationPage.register(validEmail, validPassword,'0');
        commonElement.errorMessage.should('be.visible').and('have.text','The number of users must be between 1 and 10');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 

    it ('register with 11 number of users', () =>{
        registrationPage.register(randomEmail, validPassword,'11');
        commonElement.errorMessage.should('be.visible').and('have.text','The number of users must be between 1 and 10');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 

    it ('register without checked terms and conditions', () =>{
        registrationPage.checkBoxField.click();
        registrationPage.register(validEmail, validPassword,numOfUsers);
        commonElement.errorMessage.should('be.visible').and('have.text','The agree to terms and privacy policy field is required');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=monthly&plan=1&event=page-card');
    }); 

    
    it.only ('register with all valid credentials', () =>{
        cy.intercept ( 
            'POST',
            'https://cypress-api.vivifyscrum-stage.com/api/v2/register'
        ).as('validRegistration')
        
        registrationPage.register(randomEmail,validPassword,numOfUsers);

        cy.wait('@validRegistration').then ((interception) =>{
            expect(interception.response.statusCode).eq(200);
            commonElement.organizationHeader.should('have.text', 'My Organizations')
            cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations')
        });
    }); 
});

