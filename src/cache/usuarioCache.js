const usuariosLogados = [];
const {NaoAutorizadoErro} = require('../erros/typesErros');


function adicionarNoCache(credencial){
    if(!credencial || !credencial.token || !credencial.usuario || !credencial.dataExpiracao){
        throw new NaoAutorizadoErro(401, 'Usuário ou senha inválidos');
    }
    usuariosLogados.push(credencial);
}

function removerDoCache(token){
    let indice = usuariosLogados.findIndex(credencial => credencial.token === token);
    if(!isNaA(indice)){
        usuariosLogados.splice(indice, 1);
    }
}

function obterCredencial(usuario){
    let credencial = usuariosLogados.find(credencial => credencial.usuario.id === usuario.id);
    return credencial;
}

function obeterCredencialPorToken(token){
    let credencial = usuariosLogados.find(credencial => credencial.token === token);
    return credencial;
}

function atualizarDataExpiracao(token, dataExpiracao){
    let indice = usuariosLogados.findIndex(credencial => credencial.token === token);
    if(!isNaA(indice)){
        usuariosLogados[indice].dataExpiracao = dataExpiracao;
    }
}

module.exports = {
    adicionarNoCache,
    removerDoCache,
    obterCredencial,
    obeterCredencialPorToken,
    atualizarDataExpiracao
};

