module.exports = class UsuarioDTO {
  constructor(obj){
    obj = obj || {};
    this.id = obj.id;
    this.nome = obj.nome;
    this.senha = obj.senha;
    this.perfil = obj.perfil && new PerfilDTO(obj.perfil);
    this.dataInativacao = obj.dataInativacao;
    this.criadoEm = obj.criadoEm;
    this.atualizadoEm = obj.atualizadoEm;
  }

}