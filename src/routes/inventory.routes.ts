import { Router } from "express";
import { listInventory, getInventoryItem } from "../controllers/inventory.controller.js";

const router = Router();

router.get("/", listInventory);
router.get("/:id", getInventoryItem);

export default router;