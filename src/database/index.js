const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const connection = new Sequelize(dbConfig);

const Perfil = require('../models/Perfil');
const Usuario = require('../models/Usuario');
const Cliente = require('../models/Cliente');
const Endereco = require('../models/Enderecos');

Perfil.init(connection);
Usuario.init(connection);
Cliente.init(connection);
Endereco.init(connection);

module.exports = connection;

