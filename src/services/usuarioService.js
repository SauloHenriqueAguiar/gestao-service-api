const Usuario = require('../models/Usuario');
const Perfil = require('../models/Perfil');
const { NaoAutorizadoErro, NaoEncontradoErro } = require('../erros/typesErros');
const geradorToken = require('../utils/geradorToken');
const usuarioCache = require('../cache/usuarioCache');
const UsuarioDTO = require('../dtos/UsuarioDTO');
const PerfilDTO = require('../dtos/PerfilDTO');


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

async function logout(token) {
    usuarioCache.removerNoCache(token);
}

async function obterPorId(id) {
    let usuario = await Usuario.findByPk(id);

    if (!usuario) {
        throw new NaoEncontradoErro(404, "Não foi possivel encontrar o Usuário por id");
    }

    usuario.senha = undefined;
    let usuarioDTO = new UsuarioDTO(usuario);
    let perfil = await Perfil.findByPk(usuario.idPerfil);

    usuarioDTO.perfil = new PerfilDTO(perfil);

    return usuario;

}

async function validarAutenticacao(token) {
    let credencial = usuarioCache.obterCredencialPorToken(token);

    if (!credencial || credencial.dataExpiracao < new Date()) {
       
        if(credencial) {
            usuarioCache.removerNoCache(credencial.token);
        }
        return false;
    }

    return true;
}


function _criarCredencial(usuario) {

    let dataExpiracao = geradorToken.gerarDataExpiracao();

    let credencial = usuarioCache.obterCredencial(usuario);

    if (credencial) {
        if (credencial.dataExpiracao < new Date()) {
            usuarioCache.removerNoCache(credencial.token);
        } else {
            usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao);
            return credencial;
        }
    }

    let token = geradorToken.criarToken(usuario);
    usuario.senha = undefined;

    credencial = { token, usuario, dataExpiracao };

    usuarioCache.adicionarNoCache(credencial);

    return credencial;

}




module.exports = {
    validarUsuario,
    logout,
    obterPorId,
    validarAutenticacao

};

