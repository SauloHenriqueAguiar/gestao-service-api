const express = require('express');
const routes = express.Router();
const usuarioService = require('./src/services/usuarioService');

const UsuarioController = require('./src/controllers/UsuarioController');
const usuarioController = new UsuarioController();

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


module.exports = routes;