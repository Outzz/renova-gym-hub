export type SaleStatus = "active" | "inactive" | "expired";

export class Sale {
  constructor(
    private id: string,
    private studentId: string,
    private planId: string,
    private startDate: string,
    private endDate: string,
    private status: SaleStatus = "active",
    private saleDate: string = new Date().toISOString()
  ) {
    if (!studentId) throw new Error("studentId obrigatório");
    if (!planId) throw new Error("planId obrigatório");
    if (!startDate) throw new Error("startDate obrigatório");
    if (!endDate) throw new Error("endDate obrigatório");
  }

  static create(
    studentId: string,
    planId: string,
    startDate: string,
    endDate: string,
    status: SaleStatus = "active"
  ) {
    const id = crypto.randomUUID();
    return new Sale(id, studentId, planId, startDate, endDate, status);
  }

  // Getters
  getId(): string {
    return this.id;
  }

  getStudentId(): string {
    return this.studentId;
  }

  getPlanId(): string {
    return this.planId;
  }

  getStartDate(): string {
    return this.startDate;
  }

  getEndDate(): string {
    return this.endDate;
  }

  getStatus(): SaleStatus {
    return this.status;
  }

  getSaleDate(): string {
    return this.saleDate;
  }

  // Setters
  setStatus(status: SaleStatus): void {
    this.status = status;
  }

  setEndDate(endDate: string): void {
    this.endDate = endDate;
  }
}