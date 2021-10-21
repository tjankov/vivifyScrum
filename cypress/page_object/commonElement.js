export default class CommonElements {

    get errorMessage (){
        return cy.get (".el-form-item__error");
    };

    get organizationHeader (){
        return cy.get ("span[class='vs-u-text--uppercase']").contains('My Organizations');
    }
    

}
export const commonElement = new CommonElements();

