const md5 = require('md5');
const SECRET = 'secret';

function gerarHashdaSenha(senha){
    return md5(`@${senha}:${SECRET}@`);
}

module.exports = {gerarHashdaSenha};

