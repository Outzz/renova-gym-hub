export type InvoiceStatus = "pending" | "paid" | "overdue";
export type PaymentMethod = "credit_card" | "debit_card" | "boleto" | "pix";

export class Invoice {
  constructor(
    private id: string,
    private studentId: string,
    private saleId: string,
    private amount: number,
    private dueDate: string,
    private status: InvoiceStatus = "pending",
    private paymentDate?: string,
    private paymentMethod?: PaymentMethod
  ) {
    if (!studentId) throw new Error("studentId obrigatório");
    if (!saleId) throw new Error("saleId obrigatório");
    if (!amount || amount <= 0) throw new Error("amount inválido");
    if (!dueDate) throw new Error("dueDate obrigatório");
  }

  static create(
    studentId: string,
    saleId: string,
    amount: number,
    dueDate: string
  ) {
    const id = crypto.randomUUID();
    return new Invoice(id, studentId, saleId, amount, dueDate);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getStudentId(): string {
    return this.studentId;
  }

  getSaleId(): string {
    return this.saleId;
  }

  getAmount(): number {
    return this.amount;
  }

  getDueDate(): string {
    return this.dueDate;
  }

  getStatus(): InvoiceStatus {
    return this.status;
  }

  getPaymentDate(): string | undefined {
    return this.paymentDate;
  }

  getPaymentMethod(): PaymentMethod | undefined {
    return this.paymentMethod;
  }

  // Setters
  setStatus(status: InvoiceStatus): void {
    this.status = status;
  }

  setPaymentDate(paymentDate: string): void {
    this.paymentDate = paymentDate;
  }

  setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.paymentMethod = paymentMethod;
  }

  processPayment(paymentDate: string, paymentMethod: PaymentMethod): void {
    this.status = "paid";
    this.paymentDate = paymentDate;
    this.paymentMethod = paymentMethod;
  }
}