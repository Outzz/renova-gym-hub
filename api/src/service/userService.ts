import { User, UserRole } from "../model/user";

export class UserService {
  private lista: User[] = [];

  constructor() {
    // Criar usuários de teste
    this.criarUsuario({
      nome: "Admin Renova",
      email: "admin@renova.com",
      senha: "admin123",
      telefone: "11999999999",
      role: "admin"
    });

    this.criarUsuario({
      nome: "Aluno Teste",
      email: "aluno@renova.com",
      senha: "aluno123",
      telefone: "11988888888",
      role: "student"
    });
  }

  criarUsuario(user: {
    nome: string;
    email: string;
    senha: string;
    telefone?: string;
    role?: UserRole;
  }): User {
    // Verificar se email já existe
    const existente = this.lista.find(u => u.getEmail() === user.email);
    if (existente) {
      throw new Error("Email já cadastrado");
    }

    const userCreated = User.create(
      user.nome,
      user.email,
      user.senha,
      user.telefone,
      user.role || "student"
    );
    this.lista.push(userCreated);
    return userCreated;
  }

  autenticar(email: string, senha: string): User {
    const user = this.lista.find((user) => user.getEmail() === email);
    if (!user || !user.verifyPassword(senha)) {
      throw new Error("Email ou senha inválidos");
    }
    return user;
  }

  editarUsuario(
    email: string,
    dados: {
      nome?: string;
      telefone?: string;
      senha?: string;
      role?: UserRole;
    }
  ): User {
    const user = this.lista.find((user) => user.getEmail() === email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    if (dados.nome) user.setNome(dados.nome);
    if (dados.telefone) user.setTelefone(dados.telefone);
    if (dados.senha) user.setSenha(dados.senha);
    if (dados.role) user.setRole(dados.role);

    return user;
  }

  listarUsuarios(): User[] {
    return this.lista;
  }

  buscarPorEmail(email: string): User | undefined {
    return this.lista.find((user) => user.getEmail() === email);
  }

  buscarPorId(id: string): User | undefined {
    return this.lista.find((user) => user.getId() === id);
  }

  filtrarPorRole(role: UserRole): User[] {
    return this.lista.filter((user) => user.getRole() === role);
  }

  filtrarPorNome(nome: string): User[] {
    return this.lista.filter((user) =>
      user.getNome().toLowerCase().includes(nome.toLowerCase())
    );
  }

  deletarUsuario(email: string): boolean {
    const index = this.lista.findIndex(user => user.getEmail() === email);
    if (index === -1) {
      throw new Error("Usuário não encontrado");
    }
    this.lista.splice(index, 1);
    return true;
  }
}