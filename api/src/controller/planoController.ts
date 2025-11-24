import { app } from "../server";
import { PlanService } from "../service/planoService";

const service = new PlanService();

export function PlanController() {
  // Listar todos os planos
  app.get("/planos", (req, res) => {
    const planos = service.listarPlanos();

    const planosFormatados = planos.map((plano) => ({
      id: plano.getId(),
      name: plano.getName(),
      price: plano.getPrice(),
      type: plano.getType(),
      description: plano.getDescription(),
    }));

    res.json(planosFormatados);
  });

  // Buscar plano por ID
  app.get("/planos/:id", (req, res) => {
    try {
      const { id } = req.params;
      const plano = service.buscarPorId(id);

      if (!plano) {
        return res.status(404).json({ erro: "Plano não encontrado" });
      }

      res.json({
        id: plano.getId(),
        name: plano.getName(),
        price: plano.getPrice(),
        type: plano.getType(),
        description: plano.getDescription(),
      });
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Criar plano
  app.post("/planos", (req, res) => {
    try {
      const dadosPlano = req.body;
      const novoPlano = service.criarPlano(dadosPlano);
      res.status(201).json({
        status: "Plano criado com sucesso",
        id: novoPlano.getId(),
        name: novoPlano.getName(),
        price: novoPlano.getPrice(),
        type: novoPlano.getType(),
      });
    } catch (e: any) {
      return res.status(400).json({ erro: e.message });
    }
  });

  // Editar plano
  app.put("/planos/:id", (req, res) => {
    try {
      const { id } = req.params;
      const dados = req.body;
      const planoAtualizado = service.editarPlano(id, dados);

      res.json({
        status: "Plano atualizado com sucesso",
        dados: {
          id: planoAtualizado.getId(),
          name: planoAtualizado.getName(),
          price: planoAtualizado.getPrice(),
          type: planoAtualizado.getType(),
          description: planoAtualizado.getDescription(),
        },
      });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Deletar plano
  app.delete("/planos/:id", (req, res) => {
    try {
      const { id } = req.params;
      service.deletarPlano(id);
      res.json({ status: "Plano deletado com sucesso" });
    } catch (e: any) {
      return res.status(404).json({ erro: e.message });
    }
  });

  // Filtrar planos por tipo
  app.get("/planos/tipo/:tipo", (req, res) => {
    try {
      const { tipo } = req.params;
      
      if (tipo !== "single" && tipo !== "combo") {
        return res.status(400).json({ 
          erro: "Tipo inválido. Use 'single' ou 'combo'" 
        });
      }

      const planos = service.filtrarPorTipo(tipo);
      const planosFormatados = planos.map((plano) => ({
        id: plano.getId(),
        name: plano.getName(),
        price: plano.getPrice(),
        type: plano.getType(),
        description: plano.getDescription(),
      }));

      res.json(planosFormatados);
    } catch (e: any) {
      return res.status(500).json({ erro: e.message });
    }
  });

  // Buscar planos por nome
  app.get("/planos/buscar", (req, res) => {
    const { nome } = req.query;

    if (!nome) {
      return res.status(400).json({
        mensagem: "Parâmetro 'nome' é obrigatório"
      });
    }

    const planos = service.filtrarPorNome(nome as string);
    const planosFormatados = planos.map((plano) => ({
      id: plano.getId(),
      name: plano.getName(),
      price: plano.getPrice(),
      type: plano.getType(),
      description: plano.getDescription(),
    }));

    res.status(200).json(planosFormatados);
  });
}