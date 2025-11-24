import { Plan, PlanType } from "../model/plano";

export class PlanService {
  private lista: Plan[] = [];

  constructor() {
    // Criar planos padrão
    this.criarPlano({
      name: "Musculação",
      price: 150.00,
      type: "single",
      description: "Treinos focados em ganho de massa e força muscular"
    });

    this.criarPlano({
      name: "Pilates",
      price: 210.00,
      type: "single",
      description: "Exercícios de alongamento e fortalecimento"
    });

    this.criarPlano({
      name: "Zumba",
      price: 120.00,
      type: "single",
      description: "Aulas de dança fitness energéticas"
    });

    this.criarPlano({
      name: "Musculação + Pilates",
      price: 350.00,
      type: "combo",
      description: "Combo completo: força e flexibilidade"
    });

    this.criarPlano({
      name: "Musculação + Zumba",
      price: 200.00,
      type: "combo",
      description: "Combo: treino de força e cardio dançante"
    });

    this.criarPlano({
      name: "Zumba + Pilates",
      price: 299.99,
      type: "combo",
      description: "Combo: dança fitness e alongamento"
    });
  }

  criarPlano(plan: {
    name: string;
    price: number;
    type: PlanType;
    description?: string;
  }): Plan {
    const planCreated = Plan.create(
      plan.name,
      plan.price,
      plan.type,
      plan.description
    );
    this.lista.push(planCreated);
    return planCreated;
  }

  editarPlano(
    id: string,
    dados: {
      name?: string;
      price?: number;
      type?: PlanType;
      description?: string;
    }
  ): Plan {
    const plan = this.lista.find((p) => p.getId() === id);
    if (!plan) {
      throw new Error("Plano não encontrado");
    }

    if (dados.name) plan.setName(dados.name);
    if (dados.price) plan.setPrice(dados.price);
    if (dados.type) plan.setType(dados.type);
    if (dados.description !== undefined) plan.setDescription(dados.description);

    return plan;
  }

  listarPlanos(): Plan[] {
    return this.lista;
  }

  buscarPorId(id: string): Plan | undefined {
    return this.lista.find((plan) => plan.getId() === id);
  }

  filtrarPorTipo(type: PlanType): Plan[] {
    return this.lista.filter((plan) => plan.getType() === type);
  }

  filtrarPorNome(nome: string): Plan[] {
    return this.lista.filter((plan) =>
      plan.getName().toLowerCase().includes(nome.toLowerCase())
    );
  }

  deletarPlano(id: string): boolean {
    const index = this.lista.findIndex(plan => plan.getId() === id);
    if (index === -1) {
      throw new Error("Plano não encontrado");
    }
    this.lista.splice(index, 1);
    return true;
  }
}