import bcrypt from "bcryptjs";

export type UserRole = "admin" | "student";

export class User {
  constructor(
    private id: string,
    private nome: string,
    private email: string,
    private senha: string,
    private telefone?: string,
    private role: UserRole = "student"
  ) {
    if (!nome) throw new Error("nome obrigatório");
    if (!email) throw new Error("email obrigatório");
    if (!senha) throw new Error("senha obrigatória");
    if (nome.length < 3) throw new Error("nome muito curto");
    if (senha.length < 6) throw new Error("senha muito curta");
    if (!this.isValidEmail(email)) throw new Error("email inválido");
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static create(
    nome: string,
    email: string,
    senha: string,
    telefone?: string,
    role: UserRole = "student"
  ) {
    const id = crypto.randomUUID();
    const hashedPassword = bcrypt.hashSync(senha, 10);
    return new User(id, nome, email, hashedPassword, telefone, role);
  }

  verifyPassword(senha: string): boolean {
    return bcrypt.compareSync(senha, this.senha);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getTelefone(): string | undefined {
    return this.telefone;
  }

  getRole(): UserRole {
    return this.role;
  }

  getSenha(): string {
    return this.senha;
  }

  // Setters
  setNome(nome: string): void {
    if (nome.length < 3) throw new Error("nome muito curto");
    this.nome = nome;
  }

  setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  setSenha(senha: string): void {
    if (senha.length < 6) throw new Error("senha muito curta");
    const hashedPassword = bcrypt.hashSync(senha, 10);
    this.senha = hashedPassword;
  }

  setRole(role: UserRole): void {
    this.role = role;
  }
}