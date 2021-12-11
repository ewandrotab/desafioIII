const el = require('./elements').ELEMENTS

class SignIn {
    
    preencherFormulario(email, pass) {
        cy.get(el.inputEmail).type(email)
        cy.get(el.inputPassword).type(pass)
    }

    submeterFormulario(){
        cy.get(el.buttonSignIn).click()
    }

    validarLoginComSucesso() {
        cy.contains('No articles are here... yet.').should('be.visible')
    }

    validarLoginSemSucesso(message){
        cy.contains('li', message).should('be.visible')
    }
}

export default new SignIn()