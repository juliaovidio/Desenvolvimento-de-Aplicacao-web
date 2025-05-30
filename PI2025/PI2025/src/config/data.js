// CRIANDO O ARQUIVO PARA PUXAR O BANCO DE DADOS
require('dotenv').config()
const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,  // COLOCAR process.env.xxx para puxar para o arquivo env.
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
  })

  module.exports = knex