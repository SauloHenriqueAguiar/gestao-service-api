const usuarioService = require('../services/usuarioService');
const { NaoAutorizadoErro } = require('../erros/typesErros');

class UsuarioController {

    async login(req, res) {
        const { email, senha } = req.body;

        try {

            if (!email || !senha) {
                throw new NaoAutorizadoErro(401, 'Usuário ou senha inválidos')
            }

            let credencial = await usuarioService.validarUsuario(email, senha);
            return res.json(credencial);

        } catch (error) {
            console.log(error);
            return res.status(error.status).json(error);
        }

    }

    obter(req, res) {
        return res.json({ id: 1, nome: "João" });
    }
    adicionar(req, res) {
        return res.json({ message: "Adicionar" });
    }
    atualizar(req, res) {
        return res.json({ message: "Atualizar" });
    }
    inativar(req, res) {
        return res.json({ message: "Inativar" });
    }

}

module.exports = UsuarioController;

