/// <reference types="Cypress" />

import { loginPage } from "../page_object/loginPage";
import { validEmail, validPassword, wrongPassword } from "../fixtures/user_data.json";
import { commonElement } from "../page_object/commonElement";

const faker = require ('faker');
var randomEmail = faker.internet.email();


describe ('test login feature', () =>{
    beforeEach ('visit home page', () =>{
        cy.intercept (
            'GET',
            'https://cypress-api.vivifyscrum-stage.com/api/v2/health-check'
        ).as('login');

        cy.visit('/login');

        cy.wait('@login').then((intercept)=>{
            console.log(intercept);
            expect(intercept.response.statusCode).eq(200);
            cy.url().should('contain', ('/login'));
            loginPage.loginHeading.should('have.text', 'Log in with your existing account');
            loginPage.loginHeading.should('have.css', 'color', 'rgb(62, 139, 117)');
        });

        cy.intercept(
            'POST',
            'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        ).as('loginRedirect')
    });

    it ('Login with all spaces', () =>{
        loginPage.logInInvoke(' ', ' ');
        commonElement.errorMessage.eq(0).should('be.visible').and('have.text', 'The email field must be a valid email');
        commonElement.errorMessage.eq(1).should('be.visible').and('have.text', 'The password field is required');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 


    it ('Login without email provided', () =>{
        loginPage.logInInvoke('', validPassword);
        commonElement.errorMessage.should('be.visible').and('have.text', 'The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 

    it ('Login without password provided', () =>{
        loginPage.logInInvoke(validEmail, '');
        commonElement.errorMessage.should('be.visible').and('have.text', 'The password field is required');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 

    it ('Login with valid email and wrong password', () =>{      
        loginPage.logIn(validEmail, wrongPassword);
               
        cy.wait('@loginRedirect').then((intercept)=>{
            expect(intercept.response.statusCode).eq(401);
            commonElement.errorMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
            commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
            cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        });
    });    

    it ('Login with valid email and wrong password lesser than 5 characters', () =>{
        loginPage.logIn(validEmail, 'tara');
        commonElement.errorMessage.should('be.visible').and('have.text', 'The password field must be at least 5 characters');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 

    it ('Login with wrong email and valid password', () =>{
        loginPage.logIn(randomEmail, validPassword);
               
        cy.wait('@loginRedirect').then((intercept)=>{
            expect(intercept.response.statusCode).eq(401);
            commonElement.errorMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
            cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
        });
    }); 

    //ne znam kako da prosledim prazan string ispred email-a, cypress ga ne prepoznaje 
    it ('Login with space starting at email', () =>{
        loginPage.logIn(' '+validEmail, validPassword);
        commonElement.errorMessage.should('be.visible').and('have.text', 'The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 

    //ne znam kako da prosledim prazan string posle email-a, cypress ga ne prepoznaje
    it ('Login with space at the end of email', () =>{
        loginPage.logIn(validEmail+'    ', validPassword);
        commonElement.errorMessage.should('be.visible').and('have.text', 'The email field must be a valid email');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 
 
    it ('Login with space starting at password', () =>{
        loginPage.logIn(validEmail, ' '+validPassword);
        commonElement.errorMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 

    it ('Login with space at the end of password', () =>{
        loginPage.logIn(validEmail, validPassword+' ');
        commonElement.errorMessage.should('be.visible').and('have.text', 'Oops! Your email/password combination is incorrect');
        commonElement.errorMessage.should('have.css','color','rgb(187, 57, 22)');
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/login');
    }); 

    //POSITIVE TEST CASE
    it ('Login with all valid credentials', () =>{
        loginPage.logIn(validEmail, validPassword);
                   
        cy.wait('@loginRedirect').then((intercept)=>{
            expect(intercept.response.statusCode).eq(200);
            commonElement.organizationHeader.should('have.text', 'My Organizations')
            cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/my-organizations');
        });
    }); 
});
