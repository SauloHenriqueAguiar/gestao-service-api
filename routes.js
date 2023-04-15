const express = require('express');
const routes = express.Router();
const UsuarioController = require('./src/controllers/UsuarioController');

const usuarioController = new UsuarioController();

//Rotas do usuario
routes.post("/usuarios", usuarioController.login);
routes.get("/usuarios", usuarioController.obter);

module.exports = routes;