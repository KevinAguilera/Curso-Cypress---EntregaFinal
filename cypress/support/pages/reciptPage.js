export class ReciptPage {

    constructor() {
        this.nombre = '//p[@id="name"]';
        this.numeroTarjeta = "#creditCard";
        this.precioTotal = "#totalPrice";
        this.thankYouButton = '//button[text()="Thank you"]';
    }

    verificarNombreyApellido(nombre, apellido){
        cy.xpath(this.nombre, {timeout:10000}).should("have.text", `${nombre} ${apellido} has succesfully purchased the following items`);
    }

    verificarNombreProductos(nombreProductos) {
        cy.xpath(`//p[@id="${nombreProductos}"]`).should("have.text", nombreProductos);
    }

    verificarNumeroTarjeta(numeroTarjeta) {
        cy.get(this.numeroTarjeta).should("have.text", numeroTarjeta);
    }

    verificarPrecioTotal(precioT) {
        cy.get(this.precioTotal).should("have.text", "You have spent $" + precioT)
    }

    clickThankYouButton(){
        cy.xpath(this.thankYouButton).click();
    }
}