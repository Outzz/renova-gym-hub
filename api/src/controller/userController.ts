import { app } from "../server";
import { UserService } from "../service/userService";

const service = new UserService();

export function UserController() {
  // Listar todos os usuários
  app.get("/usuarios", (req, res) => {
    const usuarios = service.listarUsuarios();

    const usuariosSemSenha = usuarios.map((usuario) => ({
      id: usuario.getId(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      telefone: usuario.getTelefone(),
      role: usuario.getRole(),
    }));

    res.json(usuariosSemSenha);
  });

  // Listar alunos
  app.get("/usuarios/alunos", (req, res) => {
    const alunos = service.filtrarPorRole("student");

    const alunosSemSenha = alunos.map((aluno) => ({
      id: aluno.getId(),
      nome: aluno.getNome(),
      email: aluno.getEmail(),
      telefone: aluno.getTelefone(),
    }));

    res.json(alunosSemSenha);
  });

  // Criar usuário
  app.post("/usuarios", (req, res) => {
    try {
      const dadosUsuario = req.body;
      const novoUsuario = service.criarUsuario(dadosUsuario);
      res.status(201).json({
        status: "Usuário criado com sucesso",
        id: novoUsuario.getId(),
        nome: novoUsuario.getNome(),
        email: novoUsuario.getEmail(),
        role: novoUsuario.getRole(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  // Editar usuário
  app.put("/usuarios/:email", (req, res) => {
    try {
      const { email } = req.params;
      const dados = req.body;
      const usuarioAtualizado = service.editarUsuario(email, dados);

      res.json({
        status: "Usuário atualizado com sucesso",
        dados: {
          id: usuarioAtualizado.getId(),
          nome: usuarioAtualizado.getNome(),
          email: usuarioAtualizado.getEmail(),
          telefone: usuarioAtualizado.getTelefone(),
          role: usuarioAtualizado.getRole(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Deletar usuário
  app.delete("/usuarios/:email", (req, res) => {
    try {
      const { email } = req.params;
      service.deletarUsuario(email);
      res.json({ status: "Usuário deletado com sucesso" });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Autenticar usuário
  app.post("/usuarios/autenticacao", (req, res) => {
    try {
      const { email, senha } = req.body;
      const usuario = service.autenticar(email, senha);

      res.json({
        status: "Autenticado com sucesso",
        dados: {
          id: usuario.getId(),
          nome: usuario.getNome(),
          email: usuario.getEmail(),
          telefone: usuario.getTelefone(),
          role: usuario.getRole(),
        },
      });
    } catch (e: any) {
      return res.status(401).json({ erro: e.message || "Não autorizado" });
    }
  });

  // Buscar usuário por email
  app.get("/usuarios/email/:email", (req, res) => {
    try {
      const { email } = req.params;
      const usuario = service.buscarPorEmail(email);

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      res.json({
        id: usuario.getId(),
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        telefone: usuario.getTelefone(),
        role: usuario.getRole(),
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar usuário por ID
  app.get("/usuarios/id/:id", (req, res) => {
    try {
      const { id } = req.params;
      const usuario = service.buscarPorId(id);

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      res.json({
        id: usuario.getId(),
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        telefone: usuario.getTelefone(),
        role: usuario.getRole(),
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar usuários por nome
  app.get("/usuarios/buscar", (req, res) => {
    const { nome } = req.query;

    if (!nome) {
      return res.status(400).json({
        mensagem: "Parâmetro 'nome' é obrigatório"
      });
    }

    const usuarios = service.filtrarPorNome(nome as string);
    const usuariosSemSenha = usuarios.map((usuario) => ({
      id: usuario.getId(),
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      telefone: usuario.getTelefone(),
      role: usuario.getRole(),
    }));

    res.status(200).json(usuariosSemSenha);
  });
}