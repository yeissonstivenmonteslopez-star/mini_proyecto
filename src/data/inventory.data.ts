import { InventoryItem } from "../models/inventory.model.js";

export const inventory: InventoryItem[] = [
  {
    id: 1,
    name: "Mouse Logitech MX Master",
    sku: "MOU-001",
    price: 420000,
    stock: 12,
    active: true,
  },
  {
    id: 2,
    name: "Teclado Mecánico Redragon",
    sku: "KEY-002",
    price: 180000,
    stock: 5,
    active: true,
  },
  {
    id: 3,
    name: "Monitor LG 24 pulgadas",
    sku: "MON-003",
    price: 650000,
    stock: 0,
    active: false,
  },
];

let nextId = 4;
export function generateId(): number {
  return nextId++;
}