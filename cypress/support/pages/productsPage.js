export class ProductsPage {

    constructor(){
        this.shoppingCart = "//button[contains(text(), 'Go to shopping cart')]";
        this.closeAlert = "#closeModal";
    }

    clickShoppingCart(){
        cy.xpath(this.shoppingCart).click();
    }

    clickAgregarProducto(producto){
        cy.get(`[value='${producto}']`).click();
    }

    cerrarAlert(){
        cy.get(this.closeAlert).click();
    }
}