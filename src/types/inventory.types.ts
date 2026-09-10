import type { InventoryItem } from "../models/inventory.model.js";

export type CreateInventoryItem = Omit<InventoryItem, "id">;

export type UpdateInventoryItem = Partial<CreateInventoryItem>;