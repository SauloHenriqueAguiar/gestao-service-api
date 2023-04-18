const Usuario = require('../models/Usuario');
const { NaoAutorizadoErro } = require('../erros/typesErros');
const geradorToken = require('../utils/geradorToken');

async function validarUsuario(email, senha) {

    email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({ where: { email } });

    senha = geradorToken.gerarHashdaSenha(senha);

    if (!usuario || (usuario.senha !== senha)) {
        throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
    }

    let credencial = _criarCredencial(usuario);

    return credencial;
}



module.exports = {validarUsuario};

