import { InventoryItem } from "../models/inventory.model.js";

export type CreateInventoryItemDTO = Omit<InventoryItem, "id">;
export type UpdateInventoryItemDTO = Partial<Omit<InventoryItem, "id">>;