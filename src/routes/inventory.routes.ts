import { Router } from "express";
import {
  listInventory,
  getInventoryItem,
  createInventoryItem,
} from "../controllers/inventory.controller.js";

const router = Router();

router.get("/", listInventory);
router.get("/:id", getInventoryItem);
router.post("/", createInventoryItem);

export default router;