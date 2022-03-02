import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
//import { it } from 'faker-br/lib/locales'
import SignupPage from '../pages/SignupPage'
//import { it } from 'faker-br/lib/locales'

describe('Signup', () => {

    //Caminho de preenchimento do formulario.
    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        let expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContetShouldBe(expectedMessage)
    })

    //Verifica mensagem de CPF inválido.
    it('Invalid document', function () {

        var deliver = signupFactory.deliver()

        deliver.cpf = '123456789aa'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alterMassegeShouldBe('Oops! CPF inválido')

    })

    //Verifica mensagem de E-mail inválido.
    it('Invalid email', function () {

        var deliver = signupFactory.deliver()

        deliver.email = 'user.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alterMassegeShouldBe('Oops! Email com formato inválido.')
    })

    context('Rquired fields', function() {
        const messages = [
            {field: 'name', output:'É necessário informar o nome'},
            {field: 'cpf', output:'É necessário informar o CPF'},
            {field: 'email', output:'É necessário informar o email'},
            {field: 'postalCode', output:'É necessário informar o CEP'},
            {field: 'number', output:'É necessário informar o número do endereço'},
            {field: 'delivery_method', output:'Selecione o método de entrega'},
            {field: 'cnh', output:'Adicione uma foto da sua CNH'}
        ]

        before (function() {
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                SignupPage.alterMassegeShouldBe(msg.output)
            })
        })
    })
})