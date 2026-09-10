import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "API TechStore funcionando"
  });
});

app.use("/api/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});