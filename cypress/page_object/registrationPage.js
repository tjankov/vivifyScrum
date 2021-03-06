export default class RegistrationPage {

    get freeSingUpButton (){
        return cy.get ("a[title='Starter']").first();
    };

    get registrationHeading (){
        return cy.get ('h1');
    };

    get submitButton (){
        return cy.get ("button[type='submit']");
    };

    get checkBoxField (){
        return cy.get (".vs-c-checkbox-check").first();
    };

    get popOutMessage (){
        return cy.get (".el-message__group").contains('User with that email already exist')
    };

    getInputField (name){
        return cy.get (`input[name=${name}]`);
    };

    registerInvoke (email, password, numberOfUsers) {
        this.getInputField(`email`).invoke('val', email);
        this.getInputField(`password`).invoke('val', password);
        this.getInputField(`number_of_users`).invoke('val', numberOfUsers);
        this.submitButton.click();
    };

    register (email, password, numberOfUsers) {
        this.getInputField(`email`).type(email);
        this.getInputField(`password`).first().type(password);
        this.getInputField(`number_of_users`).type(numberOfUsers);
        this.submitButton.click();
    };
};

export const registrationPage = new RegistrationPage ();