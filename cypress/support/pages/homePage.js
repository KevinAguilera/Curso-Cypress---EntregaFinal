export class HomePage{

    constructor(){
        this.onlineShop = "#onlineshoplink";
    }

    clickOnlineShop() {
        cy.get(this.onlineShop, {timeout: 11000}).click();
    }
}