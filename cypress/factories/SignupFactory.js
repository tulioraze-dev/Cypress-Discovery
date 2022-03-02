
var faker = require('faker-br')
var cpf = require('gerador-validador-cpf')
//Criando uma massa de teste dinâmica usando factories.
export default {

    deliver: function() {

        let firstName = faker.name.firstName()
        let lastName = faker.name.lastName()
        

        let data = {
            name:  `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '62123456789',
            address:
            {
                postalCode: '04534011',
                street: 'Rua Joaquim Floriano',
                number: '1000',
                details: 'Ap 142',
                district: 'Itaim Bibi',
                city_uf: 'São Paulo/SP'
            },
            deliveryMethod: 'Moto',
            cnh: 'images/cnh-digital.jpg'
        }

        return data

    }
}