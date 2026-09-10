import { InventoryItem } from "../models/inventory.model.js";

export const inventory: InventoryItem[] = [
  // ... (igual que antes)
];

let nextId = 4;
export function generateId(): number {
  return nextId++;
}