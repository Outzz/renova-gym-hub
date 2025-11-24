import express from "express";
import { UserController } from "./controller/userController";
import { PlanController } from "./controller/planoController";
import { SaleController } from "./controller/saleController";
import { InvoiceController } from "./controller/invoiceController";

export const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API Renova Academia rodando!" });
});

// Controllers
UserController();
PlanController();
SaleController();
InvoiceController();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});