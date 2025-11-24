import { app } from "../server";
import { SaleService } from "../service/saleService";

const service = new SaleService();

export function SaleController() {
  // Listar todas as vendas
  app.get("/vendas", (req, res) => {
    const vendas = service.listarVendas();

    const vendasFormatadas = vendas.map((venda) => ({
      id: venda.getId(),
      studentId: venda.getStudentId(),
      planId: venda.getPlanId(),
      startDate: venda.getStartDate(),
      endDate: venda.getEndDate(),
      status: venda.getStatus(),
      saleDate: venda.getSaleDate(),
    }));

    res.json(vendasFormatadas);
  });

  // Buscar venda por ID
  app.get("/vendas/:id", (req, res) => {
    try {
      const { id } = req.params;
      const venda = service.buscarPorId(id);

      if (!venda) {
        return res.status(404).json({ erro: "Venda não encontrada" });
      }

      res.json({
        id: venda.getId(),
        studentId: venda.getStudentId(),
        planId: venda.getPlanId(),
        startDate: venda.getStartDate(),
        endDate: venda.getEndDate(),
        status: venda.getStatus(),
        saleDate: venda.getSaleDate(),
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Criar venda
  app.post("/vendas", (req, res) => {
    try {
      const dadosVenda = req.body;
      const novaVenda = service.criarVenda(dadosVenda);
      res.status(201).json({
        status: "Venda criada com sucesso",
        id: novaVenda.getId(),
        studentId: novaVenda.getStudentId(),
        planId: novaVenda.getPlanId(),
        startDate: novaVenda.getStartDate(),
        endDate: novaVenda.getEndDate(),
        saleDate: novaVenda.getSaleDate(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  // Editar venda
  app.put("/vendas/:id", (req, res) => {
    try {
      const { id } = req.params;
      const dados = req.body;
      const vendaAtualizada = service.editarVenda(id, dados);

      res.json({
        status: "Venda atualizada com sucesso",
        dados: {
          id: vendaAtualizada.getId(),
          studentId: vendaAtualizada.getStudentId(),
          planId: vendaAtualizada.getPlanId(),
          startDate: vendaAtualizada.getStartDate(),
          endDate: vendaAtualizada.getEndDate(),
          status: vendaAtualizada.getStatus(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Deletar venda
  app.delete("/vendas/:id", (req, res) => {
    try {
      const { id } = req.params;
      service.deletarVenda(id);
      res.json({ status: "Venda deletada com sucesso" });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Buscar vendas por aluno
  app.get("/vendas/aluno/:studentId", (req, res) => {
    try {
      const { studentId } = req.params;
      const vendas = service.filtrarPorAluno(studentId);

      const vendasFormatadas = vendas.map((venda) => ({
        id: venda.getId(),
        studentId: venda.getStudentId(),
        planId: venda.getPlanId(),
        startDate: venda.getStartDate(),
        endDate: venda.getEndDate(),
        status: venda.getStatus(),
        saleDate: venda.getSaleDate(),
      }));

      res.json(vendasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar venda ativa por aluno
  app.get("/vendas/aluno/:studentId/ativa", (req, res) => {
    try {
      const { studentId } = req.params;
      const venda = service.vendaAtivaPorAluno(studentId);

      if (!venda) {
        return res.status(404).json({ erro: "Nenhuma venda ativa encontrada" });
      }

      res.json({
        id: venda.getId(),
        studentId: venda.getStudentId(),
        planId: venda.getPlanId(),
        startDate: venda.getStartDate(),
        endDate: venda.getEndDate(),
        status: venda.getStatus(),
        saleDate: venda.getSaleDate(),
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar vendas por plano
  app.get("/vendas/plano/:planId", (req, res) => {
    try {
      const { planId } = req.params;
      const vendas = service.filtrarPorPlano(planId);

      const vendasFormatadas = vendas.map((venda) => ({
        id: venda.getId(),
        studentId: venda.getStudentId(),
        planId: venda.getPlanId(),
        startDate: venda.getStartDate(),
        endDate: venda.getEndDate(),
        status: venda.getStatus(),
        saleDate: venda.getSaleDate(),
      }));

      res.json(vendasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar vendas por status
  app.get("/vendas/status/:status", (req, res) => {
    try {
      const { status } = req.params;

      if (status !== "active" && status !== "inactive" && status !== "expired") {
        return res.status(400).json({
          erro: "Status inválido. Use 'active', 'inactive' ou 'expired'"
        });
      }

      const vendas = service.filtrarPorStatus(status);

      const vendasFormatadas = vendas.map((venda) => ({
        id: venda.getId(),
        studentId: venda.getStudentId(),
        planId: venda.getPlanId(),
        startDate: venda.getStartDate(),
        endDate: venda.getEndDate(),
        status: venda.getStatus(),
        saleDate: venda.getSaleDate(),
      }));

      res.json(vendasFormatadas);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });
}