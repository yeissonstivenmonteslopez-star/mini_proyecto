import express from "express";
import inventoryRoutes from "./routes/inventory.routes.js";

const app = express();

app.use(express.json());
app.use("/api/inventory", inventoryRoutes);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});