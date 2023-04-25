const express = require('express');
const routes = express.Router();
const usuarioService = require('./src/services/usuarioService');

const UsuarioController = require('./src/controllers/UsuarioController');
const usuarioController = new UsuarioController();
const ClienteController = require('./src/controllers/ClienteController');
const clienteController = new ClienteController();


routes.use(async (req, res, next) => {
    const { authorization } = req.headers;
    let autenticado = await usuarioService.validarAutenticacao(authorization);
    if (!autenticado && req.originalUrl != "/login") {
        return res.status(401).json({ status: 401 ,message: "Usuario nao autenticado" ,name: "NaoAutorizado"});
    }
    next();
});





//Rotas do usuario
routes.post("/login", usuarioController.login);
routes.delete('/logout', usuarioController.logout);

routes.get("/usuarios/:id", usuarioController.obterPorId);
routes.post("/usuarios", usuarioController.cadastrar);
routes.put("/usuarios/:id", usuarioController.atualizar);

//rotas de cliente
routes.get("/clientes/:id", clienteController.obterPorId);
routes.post("/clientes", clienteController.cadastrar);
routes.put("/clientes/:id", clienteController.atualizar);


module.exports = routes;