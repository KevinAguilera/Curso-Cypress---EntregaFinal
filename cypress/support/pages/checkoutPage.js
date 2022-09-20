export class CheckoutPage {

    constructor() {
       this.primerNombre = "#FirstName";
       this.apellido = "#lastName";
       this.numeroTarjeta = '//input[@id="cardNumber"]';
       this.botonComprar = '//button[text()="Purchase"]';
    }

    escribirNombre(primerNombre) {
        cy.get(this.primerNombre).type(primerNombre);
    }

    escribirApellido(apellido) {
        cy.get(this.apellido).type(apellido);
    }

    escribirTarjeta(numero) {
        cy.xpath(this.numeroTarjeta).type(numero);
    }

    clickPurchaseButton(){
        cy.xpath( this.botonComprar).click();
    }
}