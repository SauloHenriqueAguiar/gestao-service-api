class UsuarioController {

    login(req, res) {
        return res.json({ message: "Login" });
    }
    obter(req, res) {
        return res.json({ id: 1, nome: "João" });
    }
    adicionar (req, res) {
        return res.json({ message: "Adicionar" });
    }
    atualizar (req, res) {
        return res.json({ message: "Atualizar" });
    }
    inativar (req, res) {
        return res.json({ message: "Inativar" });
    }
    
}

module.exports = UsuarioController;

