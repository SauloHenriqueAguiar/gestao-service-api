const ModeloInvalidoErro = class ModeloInvalidoErro {
    /**
     * Metodo JSDoc(comando "/**" )
     * Classe utilizada para exceções de modelos e dtos.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status,mensagem) {
        this.status = status || 400;
        this.message = mensagem || 'Modelo inválido';
        this.name = 'ModeloInvalidoErro';
        this.stack = (new Error()).stack;
    }
}

const NaoAutorizadoErro = class NaoAutorizadoErro {
    /**
     * Metodo JSDoc(comando "/**" )
     * Classe utilizada para exceções de acessos ou requisições não autorizadas.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status,mensagem) {
        this.status = status || 403;
        this.message = mensagem || 'Recurso não autorizado';
        this.name = 'NaoAutorizado';
    }
}

const NaoEncontradoErro = class NaoEncontradoErro {
    /**
     * Metodo JSDoc(comando "/**" )
     * Classe utilizada para exceções nao encontradas.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status,mensagem) {
        this.status = status || 404;
        this.message = mensagem || 'Nao Encontrado';
        this.name = 'NaoEncontrado';
    }
}

const AplicacaoErro = class AplicacaoErro {
    /**
     * Metodo JSDoc(comando "/**" )
     * Classe utilizada para exceções de modelos e dtos.
     * @param {Number} status 
     * @param {String} mensagem 
     */
    constructor(status,mensagem) {
        this.status = status || 500;
        this.message = mensagem || `Erro interno da aplicação ${mensagem && '-' + mensagem}`;
        this.name = 'Aplicacao';

    }
}

module.exports = {
    ModeloInvalidoErro,
    NaoAutorizadoErro,
    NaoEncontradoErro,
    AplicacaoErro
}

