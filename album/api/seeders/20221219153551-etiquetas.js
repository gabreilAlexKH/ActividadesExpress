'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let etiquetas = ['foto', 'payaso', 'rojo', 'azul','techo', 'cielo', 'foco' , 'luz']

    for (const etiq of etiquetas) {
      await queryInterface.bulkInsert('etiquetas', [{  
        texto: etiq,
        createdAt: new Date(),  
        updatedAt: new Date()  
    }], {});  
      
    }
    

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('etiquetas', null, {});
  }
};
