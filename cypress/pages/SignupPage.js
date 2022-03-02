class SignupPage {
    go() {
        //Informa a url onde será executado o teste.
        cy.visit('/');
        //Método usado para clicar e navegar para a próxima página.
        cy.get('a[href="/deliver"]').click();
        //Checkpoint fazendo uma pequena validção para confirmar se o caminho levou para o lugar certo.
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
    }

    fillForm(deliver) {
        //MÉTODO DE PREENCHIMENTO AUTOMATIZADO DE INFO PESSOAIS
        //Mecanismo de preenchimento automatizado dos dados para cadastro.
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"').type(deliver.whatsapp);

        //MÉTODO DE PREENCHIMENTO AUTOMATIZADO DO END.
        cy.get('input[name="postalcode"]').type(deliver.address.postalCode);
        //Método de click que busca as infos de endereço clicando no botão de busca por CEP.
        cy.get('input[type="button"][value="Buscar CEP"]').click();
        //Mecanismo de preenchimento automatico das infos de endreço
        cy.get('input[name="address-number"').type(deliver.address.number);
        cy.get('input[name="address-details"').type(deliver.address.details);

        //Método que valida as informações traziadas apó o click no botão de buscar end. pelo CEP.
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_uf);

        //Método automatizado que seleciona a opção de veículo do entregador.
        cy.contains('.delivery-method li', deliver.deliveryMethod).click();

        //Método automatizado que faz o upload da imagem da CNH do entregador.
        cy.get('input[accept^="image"]').attachFile(deliver.cnh);
    }

    submit() {
        //Função de clicar no botão "enviar".
        cy.get('button[type="submit"]').click();
    }

    modalContetShouldBe(expectedMessage) {
        //Função que valida que o envio do cadastro foi realizado com sucesso.
        cy.get('div[class="swal2-html-container"]')
            .should('have.text', expectedMessage)
    }

    alterMassegeShouldBe(expectedMessage) {
        //Função que verifica mensagem de erro.
        //cy.get('.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')
    }
}

export default new SignupPage;