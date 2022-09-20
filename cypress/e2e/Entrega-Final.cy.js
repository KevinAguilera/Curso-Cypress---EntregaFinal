/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { ReciptPage } from "../support/pages/reciptPage";

describe('Entrega Final', () => {

  const user = "kevin" + Math.floor(Math.random() * 10000);
  const pass = "123456!";
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkoutPage = new CheckoutPage();
  const reciptPage = new ReciptPage();
  let datosCheckout, productos;

  before("Cargo los datos del fixture y los request para registro y login ", () => {

    cy.fixture("checkout").then(data => {
      datosCheckout = data;
    })
    cy.fixture("productos").then(data => {
      productos = data;
    })

    cy.request({
      url: "https://pushing-it-backend.herokuapp.com/api/register",
      method: "POST",
      body: {
        username: user,
        password: pass,
        gender: "male",
        year: "1994",
        month: "7",
        day: "24"
      }

    }).then(respuesta => {
      expect(respuesta.status).to.equal(200);
      expect(respuesta.body.newUser.username).equal(user);
    
    }).then(respuesta => {
      cy.request({
        url: "https://pushing-it-backend.herokuapp.com/api/login",
        method: "POST",
        body: {
          username: respuesta.body.newUser.username,
          password: pass,
        }

      }).then(respuesta => {
        expect(respuesta.status).to.equal(200);
        window.localStorage.setItem("token", respuesta.body.token);
        window.localStorage.setItem("user", respuesta.body.user.username);
        cy.log(respuesta)
      })
      cy.visit("");
    })
  });

  it('Verificar nombre y precio de dos productos añadidos al carrito y posteriormente verificar el precio acumulado de ambos', () => {
    homePage.clickOnlineShop();
    productsPage.clickAgregarProducto(productos.primerProductoNombre);
    productsPage.cerrarAlert();
    productsPage.clickAgregarProducto(productos.segundoProductoNombre)
    productsPage.cerrarAlert();
    productsPage.clickShoppingCart();
    shoppingCartPage.verificarProductoNombre(productos.primerProductoNombre)
    shoppingCartPage.verificarProductoPrecio(productos.primerProductoPrecio)
    shoppingCartPage.verificarProductoNombre(productos.segundoProductoNombre);
    shoppingCartPage.verificarProductoPrecio(productos.segundoProductoPrecio);
    shoppingCartPage.clickTotalPrice();
    shoppingCartPage.verificarPrecioTotal(productos.primerProductoPrecio + productos.segundoProductoPrecio);
    shoppingCartPage.clickCheckOutButton();
    checkoutPage.escribirNombre(datosCheckout.nombre);
    checkoutPage.escribirApellido(datosCheckout.apellido);
    checkoutPage.escribirTarjeta(datosCheckout.tarjetaCredito);
    checkoutPage.clickPurchaseButton();
    reciptPage.verificarNombreyApellido(datosCheckout.nombre, datosCheckout.apellido);
    reciptPage.verificarNombreProductos(productos.primerProductoNombre);
    reciptPage.verificarNombreProductos(productos.segundoProductoNombre);
    reciptPage.verificarNumeroTarjeta(datosCheckout.tarjetaCredito);
    reciptPage.verificarPrecioTotal(productos.primerProductoPrecio + productos.segundoProductoPrecio);
    reciptPage.clickThankYouButton();
  })

  after("Una vez finalizado el test borro el usuario", () => {
    cy.request({
      method: "DELETE",
      url: "https://pushing-it-backend.herokuapp.com/api/deleteuser/" + user
      
    }).then(respuesta => {
      expect(respuesta.status).to.equal(200);
    })
  })
})
