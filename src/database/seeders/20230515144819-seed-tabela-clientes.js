'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('clientes', 
    [
        {
          nome: 'Saulo Henrique',
          email:"saulohenriqueef@gmail.com",
          cpfOuCnpj:"12345678901",
          telefone: "21985522336"
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('clientes');
  }
};