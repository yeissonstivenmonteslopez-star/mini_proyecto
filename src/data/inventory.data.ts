import type { InventoryItem } from "../models/inventory.model.js";

export const inventory: InventoryItem[] = [
  {
    id: 1,
    name: "Mouse Logitech MX Master",
    sku: "MOU-001",
    price: 420000,
    stock: 12,
    active: true
  },
  {
    id: 2,
    name: "Teclado Mecánico Redragon",
    sku: "TEC-002",
    price: 280000,
    stock: 8,
    active: true
  },
  {
    id: 3,
    name: "Monitor Samsung 24 pulgadas",
    sku: "MON-003",
    price: 750000,
    stock: 5,
    active: true
  }
];

let nextId = 4;

export const generateInventoryId = (): number => {
  return nextId++;
};