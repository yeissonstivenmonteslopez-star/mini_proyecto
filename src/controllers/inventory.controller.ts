import { Request, Response } from "express";
import { inventory, generateId } from "../data/inventory.data.js";
import { CreateInventoryItemDTO } from "../types/inventory.types.js";

export function listInventory(_req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: inventory,
  });
}

export function getInventoryItem(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const item = inventory.find((inventoryItem) => inventoryItem.id === id);

  if (!item) {
    res.status(404).json({
      success: false,
      message: "Producto no encontrado.",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: item,
  });
}

export function createInventoryItem(req: Request, res: Response): void {
  const body = req.body as Record<string, unknown>;

  const errors: string[] = [];

  // name
  if (typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("name es obligatorio y no puede estar vacío.");
  }

  // sku
  if (typeof body.sku !== "string" || body.sku.trim() === "") {
    errors.push("sku es obligatorio y no puede estar vacío.");
  }

  // price
  if (
    typeof body.price !== "number" ||
    !Number.isFinite(body.price) ||
    body.price <= 0
  ) {
    errors.push("price debe ser un número finito mayor que 0.");
  }

  // stock
  if (
    typeof body.stock !== "number" ||
    !Number.isInteger(body.stock) ||
    body.stock < 0
  ) {
    errors.push("stock debe ser un número entero mayor o igual que 0.");
  }

  // active
  if (typeof body.active !== "boolean") {
    errors.push("active debe ser boolean (true/false, no string).");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Datos inválidos.",
      errors,
    });
    return;
  }

  const newItem = {
    id: generateId(),
    name: (body.name as string).trim(),
    sku: (body.sku as string).trim(),
    price: body.price as number,
    stock: body.stock as number,
    active: body.active as boolean,
  };

  inventory.push(newItem);

  res.status(201).json({
    success: true,
    data: newItem,
  });
}