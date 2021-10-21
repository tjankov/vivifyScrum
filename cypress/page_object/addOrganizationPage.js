

export default class AddOrganization {

    get addNewOrganizationButton (){
        return cy.get ('div[class="vs-c-my-organization__content" ]').last();
    };

    get inputOrganizationName (){
        return cy.get ('input[placeholder="Enter name..."]');
    };

    get uploadOrganizationLogo (){
        return cy.get ('input[class="el-upload__input" ]').last();
    };

    get nextButton (){
        return cy.get ('button').contains('Next');
    };

    get saveButton (){
        return cy.get ('button[name="save-btn"]').last();
    };

    get createButton (){
        return cy.get ('button').contains('Create');
    };

    get okButton (){
        return cy.get ('button[class="vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button"]').last();
    };

    get myOrganizationTitle (){
        return cy.get ('strong').first().contains('Domaci')
    }
    
    addOrganization(name, img){
        this.addNewOrganizationButton.click();
        this.inputOrganizationName.type(name);
        this.nextButton.click();
        this.uploadOrganizationLogo.attachFile(img);
        this.saveButton.click();
        this.createButton.click();
        this.okButton.click();
    }
    
};

export const addOrganization = new AddOrganization();
