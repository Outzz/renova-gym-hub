import { app } from "../server";
import { InvoiceService } from "../service/invoiceService";

const service = new InvoiceService();

export function InvoiceController() {
  // Listar todas as faturas
  app.get("/faturas", (req, res) => {
    const faturas = service.listarFaturas();

    const faturasFormatadas = faturas.map((fatura) => ({
      id: fatura.getId(),
      studentId: fatura.getStudentId(),
      saleId: fatura.getSaleId(),
      amount: fatura.getAmount(),
      dueDate: fatura.getDueDate(),
      status: fatura.getStatus(),
      paymentDate: fatura.getPaymentDate(),
      paymentMethod: fatura.getPaymentMethod(),
    }));

    res.json(faturasFormatadas);
  });

  // Buscar fatura por ID
  app.get("/faturas/:id", (req, res) => {
    try {
      const { id } = req.params;
      const fatura = service.buscarPorId(id);

      if (!fatura) {
        return res.status(404).json({ erro: "Fatura não encontrada" });
      }

      res.json({
        id: fatura.getId(),
        studentId: fatura.getStudentId(),
        saleId: fatura.getSaleId(),
        amount: fatura.getAmount(),
        dueDate: fatura.getDueDate(),
        status: fatura.getStatus(),
        paymentDate: fatura.getPaymentDate(),
        paymentMethod: fatura.getPaymentMethod(),
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Criar fatura
  app.post("/faturas", (req, res) => {
    try {
      const dadosFatura = req.body;
      const novaFatura = service.criarFatura(dadosFatura);
      res.status(201).json({
        status: "Fatura criada com sucesso",
        id: novaFatura.getId(),
        studentId: novaFatura.getStudentId(),
        amount: novaFatura.getAmount(),
        dueDate: novaFatura.getDueDate(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  // Processar pagamento
  app.post("/faturas/:id/pagamento", (req, res) => {
    try {
      const { id } = req.params;
      const { paymentDate, paymentMethod } = req.body;

      if (!paymentDate || !paymentMethod) {
        return res.status(400).json({
          erro: "paymentDate e paymentMethod são obrigatórios"
        });
      }

      const faturaAtualizada = service.processarPagamento(
        id,
        paymentDate,
        paymentMethod
      );

      res.json({
        status: "Pagamento processado com sucesso",
        dados: {
          id: faturaAtualizada.getId(),
          status: faturaAtualizada.getStatus(),
          paymentDate: faturaAtualizada.getPaymentDate(),
          paymentMethod: faturaAtualizada.getPaymentMethod(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Editar fatura
  app.put("/faturas/:id", (req, res) => {
    try {
      const { id } = req.params;
      const dados = req.body;
      const faturaAtualizada = service.editarFatura(id, dados);

      res.json({
        status: "Fatura atualizada com sucesso",
        dados: {
          id: faturaAtualizada.getId(),
          studentId: faturaAtualizada.getStudentId(),
          saleId: faturaAtualizada.getSaleId(),
          amount: faturaAtualizada.getAmount(),
          dueDate: faturaAtualizada.getDueDate(),
          status: faturaAtualizada.getStatus(),
          paymentDate: faturaAtualizada.getPaymentDate(),
          paymentMethod: faturaAtualizada.getPaymentMethod(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Deletar fatura
  app.delete("/faturas/:id", (req, res) => {
    try {
      const { id } = req.params;
      service.deletarFatura(id);
      res.json({ status: "Fatura deletada com sucesso" });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Buscar faturas por aluno
  app.get("/faturas/aluno/:studentId", (req, res) => {
    try {
      const { studentId } = req.params;
      const faturas = service.filtrarPorAluno(studentId);

      const faturasFormatadas = faturas.map((fatura) => ({
        id: fatura.getId(),
        studentId: fatura.getStudentId(),
        saleId: fatura.getSaleId(),
        amount: fatura.getAmount(),
        dueDate: fatura.getDueDate(),
        status: fatura.getStatus(),
        paymentDate: fatura.getPaymentDate(),
        paymentMethod: fatura.getPaymentMethod(),
      }));

      res.json(faturasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar faturas por venda
  app.get("/faturas/venda/:saleId", (req, res) => {
    try {
      const { saleId } = req.params;
      const faturas = service.filtrarPorVenda(saleId);

      const faturasFormatadas = faturas.map((fatura) => ({
        id: fatura.getId(),
        studentId: fatura.getStudentId(),
        saleId: fatura.getSaleId(),
        amount: fatura.getAmount(),
        dueDate: fatura.getDueDate(),
        status: fatura.getStatus(),
        paymentDate: fatura.getPaymentDate(),
        paymentMethod: fatura.getPaymentMethod(),
      }));

      res.json(faturasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar faturas por status
  app.get("/faturas/status/:status", (req, res) => {
    try {
      const { status } = req.params;

      if (status !== "pending" && status !== "paid" && status !== "overdue") {
        return res.status(400).json({
          erro: "Status inválido. Use 'pending', 'paid' ou 'overdue'"
        });
      }

      const faturas = service.filtrarPorStatus(status);

      const faturasFormatadas = faturas.map((fatura) => ({
        id: fatura.getId(),
        studentId: fatura.getStudentId(),
        saleId: fatura.getSaleId(),
        amount: fatura.getAmount(),
        dueDate: fatura.getDueDate(),
        status: fatura.getStatus(),
        paymentDate: fatura.getPaymentDate(),
        paymentMethod: fatura.getPaymentMethod(),
      }));

      res.json(faturasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar faturas pendentes
  app.get("/faturas/pendentes", (req, res) => {
    try {
      const faturas = service.faturasPendentes();

      const faturasFormatadas = faturas.map((fatura) => ({
        id: fatura.getId(),
        studentId: fatura.getStudentId(),
        saleId: fatura.getSaleId(),
        amount: fatura.getAmount(),
        dueDate: fatura.getDueDate(),
        status: fatura.getStatus(),
      }));

      res.json(faturasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar faturas vencidas
  app.get("/faturas/vencidas", (req, res) => {
    try {
      const faturas = service.faturasVencidas();

      const faturasFormatadas = faturas.map((fatura) => ({
        id: fatura.getId(),
        studentId: fatura.getStudentId(),
        saleId: fatura.getSaleId(),
        amount: fatura.getAmount(),
        dueDate: fatura.getDueDate(),
        status: fatura.getStatus(),
      }));

      res.json(faturasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });
}