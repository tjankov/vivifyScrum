/// <reference types="Cypress" />

import { registrationPage } from './../page_object/registrationPage';
import { validEmail, validPassword } from './../fixtures/user_data.json'

const faker = require ('faker');

describe ('test registration feature', () => {
    beforeEach ('visit home page', () =>{
        cy.intercept(
            'GET',
            'https://cypress-api.vivifyscrum-stage.com/pricing'
        ).as('registration');

        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing')
        registrationPage.freeSingUpButton.click({force:true});
        
        
        cy.wait ('@registration').then (() =>{
            cy.url().should('contain', '/sign-up' )
            registrationPage.registrationHeading.should('have.text', 'Account Details:')
        })  
    })

    it ('register without email provided', () =>{
        registrationPage.register('', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email', {force: true})
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it.only ('register wit already existing email', () =>{
        registrationPage.register(validEmail, validPassword,'2');
        registrationPage.popOutMessage.should('be.visible');
        registrationPage.popOutMessage.should('have.css', 'color', 'rgb(131, 145, 165)');
    });

    it ('register with invalid email - "@" is missing', () =>{
        registrationPage.register('tamarajankov.com', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it ('register with invalid email - "." is missing', () =>{
        registrationPage.register('tamara@jankovcom', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it ('register with invalid email - starting with space', () =>{
        registrationPage.register(' tamara@jankov.com', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it ('register with invalid email - space at the end', () =>{
        registrationPage.register('tamara@jankov.com ', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it ('register with invalid email - space after @', () =>{
        registrationPage.register('tamara@ jankov.com ', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it ('register with invalid email - space before @', () =>{
        registrationPage.register('tamara @jankov.com ', validPassword,'2')
        registrationPage.errorMessage.should('have.text','The email field must be a valid email')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    });

    it ('register without password provided', () =>{
        registrationPage.register(validEmail, '','2')
        registrationPage.errorMessage.should('have.text','The password field is required')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 

    it ('register with all spaces in password', () =>{
        registrationPage.register(validEmail, '     ','2')
        registrationPage.errorMessage.should('have.text','The password field is required')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 

     it ('register with 3 credentials in password', () =>{
        registrationPage.register(validEmail, '123','2')
        registrationPage.errorMessage.should('have.text','The password field must be at least 5 characters')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 
        
    it ('register without number of users provided', () =>{
        registrationPage.register(validEmail, validPassword,'')
        registrationPage.errorMessage.should('have.text','The number of users field is required')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 

    it ('register with 0 number of users', () =>{
        registrationPage.register(validEmail, validPassword,'0')
        registrationPage.errorMessage.should('have.text','The number of users must be between 1 and 10')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 

    it ('register without checked terms and conditions', () =>{
        registrationPage.checkBoxField.click();
        registrationPage.register(validEmail, validPassword,'2')
        registrationPage.errorMessage.should('be.visible').and('have.text','The agree to terms and privacy policy field is required')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 

    it ('register with all valid credentials', () =>{
        registrationPage.checkBoxField.click();
        registrationPage.register(faker.internet.email, validPassword,'2')
        registrationPage.errorMessage.should('be.visible').and('have.text','The agree to terms and privacy policy field is required')
        registrationPage.errorMessage.should('have.css','color','rgb(187, 57, 22)')
    }); 


    

    

    
        
        
    




    })






