export type PlanType = "single" | "combo";

export class Plan {
  constructor(
    private id: string,
    private name: string,
    private price: number,
    private type: PlanType,
    private description?: string
  ) {
    if (!name) throw new Error("nome obrigatório");
    if (!price || price <= 0) throw new Error("preço inválido");
    if (!type) throw new Error("tipo obrigatório");
    if (name.length < 3) throw new Error("nome muito curto");
  }

  static create(
    name: string,
    price: number,
    type: PlanType,
    description?: string
  ) {
    const id = crypto.randomUUID();
    return new Plan(id, name, price, type, description);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }

  getType(): PlanType {
    return this.type;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  // Setters
  setName(name: string): void {
    if (name.length < 3) throw new Error("nome muito curto");
    this.name = name;
  }

  setPrice(price: number): void {
    if (price <= 0) throw new Error("preço inválido");
    this.price = price;
  }

  setType(type: PlanType): void {
    this.type = type;
  }

  setDescription(description: string): void {
    this.description = description;
  }
}