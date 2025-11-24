import { Invoice, InvoiceStatus, PaymentMethod } from "../model/invoice";

export class InvoiceService {
  private lista: Invoice[] = [];

  criarFatura(invoice: {
    studentId: string;
    saleId: string;
    amount: number;
    dueDate: string;
  }): Invoice {
    const invoiceCreated = Invoice.create(
      invoice.studentId,
      invoice.saleId,
      invoice.amount,
      invoice.dueDate
    );
    this.lista.push(invoiceCreated);
    return invoiceCreated;
  }

  processarPagamento(
    id: string,
    paymentDate: string,
    paymentMethod: PaymentMethod
  ): Invoice {
    const invoice = this.lista.find((i) => i.getId() === id);
    if (!invoice) {
      throw new Error("Fatura não encontrada");
    }

    invoice.processPayment(paymentDate, paymentMethod);
    return invoice;
  }

  editarFatura(
    id: string,
    dados: {
      status?: InvoiceStatus;
      paymentDate?: string;
      paymentMethod?: PaymentMethod;
    }
  ): Invoice {
    const invoice = this.lista.find((i) => i.getId() === id);
    if (!invoice) {
      throw new Error("Fatura não encontrada");
    }

    if (dados.status) invoice.setStatus(dados.status);
    if (dados.paymentDate) invoice.setPaymentDate(dados.paymentDate);
    if (dados.paymentMethod) invoice.setPaymentMethod(dados.paymentMethod);

    return invoice;
  }

  listarFaturas(): Invoice[] {
    return this.lista;
  }

  buscarPorId(id: string): Invoice | undefined {
    return this.lista.find((invoice) => invoice.getId() === id);
  }

  filtrarPorAluno(studentId: string): Invoice[] {
    return this.lista.filter((invoice) => invoice.getStudentId() === studentId);
  }

  filtrarPorVenda(saleId: string): Invoice[] {
    return this.lista.filter((invoice) => invoice.getSaleId() === saleId);
  }

  filtrarPorStatus(status: InvoiceStatus): Invoice[] {
    return this.lista.filter((invoice) => invoice.getStatus() === status);
  }

  faturasPendentes(): Invoice[] {
    return this.filtrarPorStatus("pending");
  }

  faturasVencidas(): Invoice[] {
    const hoje = new Date().toISOString().split('T')[0];
    return this.lista.filter(
      (invoice) => 
        invoice.getStatus() === "pending" && 
        invoice.getDueDate() < hoje
    );
  }

  deletarFatura(id: string): boolean {
    const index = this.lista.findIndex(invoice => invoice.getId() === id);
    if (index === -1) {
      throw new Error("Fatura não encontrada");
    }
    this.lista.splice(index, 1);
    return true;
  }
}