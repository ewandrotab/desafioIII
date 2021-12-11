///  <reference types="cypress"/>

import signin from "../support/pages/signin";

describe('Login', () => {

    beforeEach(() => {
        cy.visit('login')
    });

    it('Quando informar email e senha válidos, deve acessar', () => {
        
        cy.intercept({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login'

        }, {

            statusCode: 200,
            fixture: 'login-com-sucesso.json'
        }).as('postUser')
        
        signin.preencherFormulario('chapterv@mail.com', 'pwd123')
        signin.submeterFormulario()       
        signin.validarLoginComSucesso()
        
    });

    it("Quando não informar usuário e senha, deve exibir mensagem: email can't be blank", () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login'

        }, {

            statusCode: 422,
            fixture: 'login-sem-informar-email-senha.json'
        }).as('postUser')

        signin.submeterFormulario()
        signin.validarLoginSemSucesso("email can't be blank")    
        
    });

    it('Quando informar email válido e senha inválida, deve exibir mensagem: email or password is invalid', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login'

        }, {

            statusCode: 403,
            fixture: 'login-com-senha-invalida.json'
        }).as('postUser')
                        
        signin.preencherFormulario('chapterv@mail.com', 'SenhaInvalida')
        signin.submeterFormulario()
        signin.validarLoginSemSucesso("email or password is invalid")
        
    });

    it('Quando informar email inválido e senha válida, deve exibir mensagem: email or password is invalid', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login'

        }, {

            statusCode: 403,
            fixture: 'login-com-usuario-invalido.json'
        }).as('postUser')
                        
        signin.preencherFormulario('usuarioinvalido@mail.com', 'pwd123')
        signin.submeterFormulario()
        signin.validarLoginSemSucesso('email or password is invalid')
        
    });

    it("Quando não informar email e informar a senha, deve exibir mensagem: email can't be blank", () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login'

        }, {

            statusCode: 422,
            fixture: 'login-sem-informar-email.json'
        }).as('postUser')
                        
        cy.get('input[placeholder="Password"]').type('pwd123')
        
        signin.submeterFormulario()
        signin.validarLoginSemSucesso("email can't be blank")
        
    });

    it("Quando informar o email e não informar a senha, deve exibir mensagem: password can't be blank", () => {
        cy.intercept({
            method: 'POST',
            url: 'https://api.realworld.io/api/users/login'

        }, {

            statusCode: 422,
            fixture: 'login-sem-informar-senha.json'
        }).as('postUser')
                        
        cy.get('input[placeholder="Email"]').type('abobrinhav@mail.com')
        signin.submeterFormulario()
        signin.validarLoginSemSucesso("password can't be blank")
        
    });
});