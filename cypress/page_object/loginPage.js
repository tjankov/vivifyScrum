export default class LoginPage {

    get loginHeading (){
    return cy.get ('h1');
    };

    get logInButton (){
        return cy.get ("button[type='submit']");
    };

    get backToHomeButton (){
        return cy.get ("a").contains('Back to home')
    };

    getInputField (name){
        return cy.get(`input[name=${name}]`);
    };

    logInInvoke (email, password){
        this.getInputField(`email`).invoke('val', email);
        this.getInputField(`password`).invoke('val', password);
        this.logInButton.click();
    };

    logIn (email, password){
        this.getInputField(`email`).type(email);
        this.getInputField(`password`).first().type(password);
        this.logInButton.click();
    };
};
export  const loginPage = new LoginPage();