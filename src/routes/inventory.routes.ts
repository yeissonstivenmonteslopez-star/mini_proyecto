import { Router } from "express";
import {
  listInventory,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventory.controller.js";

const router = Router();

router.get("/", listInventory);
router.get("/:id", getInventoryItem);
router.post("/", createInventoryItem);
router.patch("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

export default router;