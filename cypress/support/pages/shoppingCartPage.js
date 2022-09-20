export class ShoppingCartPage {

    constructor(){
        this.precioTotal = "#price";
        this.totalPrice = "//button[contains(text(), 'Show total price')]"
        this.checkoutButton = '//button[text()="Go to Checkout"]';
    }
    
    clickTotalPrice(){
        cy.xpath(this.totalPrice).click();
    }
    
    verificarProductoNombre(producto){
        cy.contains(producto).should('have.text', producto);
    }

    verificarProductoPrecio(precio){
        cy.contains(precio).should('have.text', '$' + precio);
    }

    verificarPrecioTotal(precioT){
        cy.get(this.precioTotal).should('have.text', precioT);
    }

    clickCheckOutButton(){
        cy.xpath(this.checkoutButton).click();
    }
}