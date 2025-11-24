import { Sale, SaleStatus } from "../model/sale";

export class SaleService {
  private lista: Sale[] = [];

  criarVenda(sale: {
    studentId: string;
    planId: string;
    startDate: string;
    endDate: string;
    status?: SaleStatus;
  }): Sale {
    const saleCreated = Sale.create(
      sale.studentId,
      sale.planId,
      sale.startDate,
      sale.endDate,
      sale.status || "active"
    );
    this.lista.push(saleCreated);
    return saleCreated;
  }

  editarVenda(
    id: string,
    dados: {
      status?: SaleStatus;
      endDate?: string;
    }
  ): Sale {
    const sale = this.lista.find((s) => s.getId() === id);
    if (!sale) {
      throw new Error("Venda não encontrada");
    }

    if (dados.status) sale.setStatus(dados.status);
    if (dados.endDate) sale.setEndDate(dados.endDate);

    return sale;
  }

  listarVendas(): Sale[] {
    return this.lista;
  }

  buscarPorId(id: string): Sale | undefined {
    return this.lista.find((sale) => sale.getId() === id);
  }

  filtrarPorAluno(studentId: string): Sale[] {
    return this.lista.filter((sale) => sale.getStudentId() === studentId);
  }

  filtrarPorPlano(planId: string): Sale[] {
    return this.lista.filter((sale) => sale.getPlanId() === planId);
  }

  filtrarPorStatus(status: SaleStatus): Sale[] {
    return this.lista.filter((sale) => sale.getStatus() === status);
  }

  vendaAtivaPorAluno(studentId: string): Sale | undefined {
    return this.lista.find(
      (sale) => sale.getStudentId() === studentId && sale.getStatus() === "active"
    );
  }

  deletarVenda(id: string): boolean {
    const index = this.lista.findIndex(sale => sale.getId() === id);
    if (index === -1) {
      throw new Error("Venda não encontrada");
    }
    this.lista.splice(index, 1);
    return true;
  }
}