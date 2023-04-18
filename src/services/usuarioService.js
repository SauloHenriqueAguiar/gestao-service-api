const Usuario = require('../models/Usuario');
const { NaoAutorizadoErro } = require('../erros/typesErros');
const geradorToken = require('../utils/geradorToken');
const usuarioCache = require('../cache/usuarioCache');



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

function _criarCredencial(usuario) {
    
    let dataExpiracao = geradorToken.gerarDataExpiracao();

    let credencial = usuarioCache.obterCredencial(usuario);

    if(credencial){
        if(credencial.dataExpiracao < new Date()){
            usuarioCache.removerNoCache(credencial.token);
        }else{
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
    logout

};

