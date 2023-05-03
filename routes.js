const express = require('express');
const routes = express.Router();
const usuarioService = require('./src/services/usuarioService');

const UsuarioController = require('./src/controllers/UsuarioController');
const usuarioController = new UsuarioController();
const ClienteController = require('./src/controllers/ClienteController');
const clienteController = new ClienteController();
const ServicoController = require('./src/controllers/ServicoController');
const servicoController = new ServicoController();
const PrestadorController = require('./src/controllers/PrestadorController');
const prestadorController = new PrestadorController();


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

//rotas de servicos
routes.get("/servicos", servicoController.obterTodos);
routes.get("/servicos/:id", servicoController.obterPorId);
routes.post("/servicos", servicoController.cadastrar);
routes.put("/servicos/:id", servicoController.atualizar);

// rotas de prestador
routes.get("/prestadores/:id", prestadorController.obterPorId);
routes.get("/prestadores", prestadorController.obterTodos);
routes.post("/prestadores", prestadorController.cadastrar); 
routes.put("/prestadores/:id", prestadorController.atualizar);

module.exports = routes;