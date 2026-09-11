import { Request, Response } from "express";
import { inventory, generateId } from "../data/inventory.data.js";
import { UpdateInventoryItemDTO } from "../types/inventory.types.js";

const ALLOWED_FIELDS = ["name", "sku", "price", "stock", "active"] as const;

export function listInventory(req: Request, res: Response): void {
  res.status(200).json({
    success: true,
    data: inventory,
    total: inventory.length,
  });
}

export function getInventoryItem(req: Request, res: Response): void {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(400).json({
      success: false,
      message: "El ID debe ser un número entero positivo.",
    });
    return;
  }

  const item = inventory.find((i) => i.id === parsedId);

  if (!item) {
    res.status(404).json({
      success: false,
      message: `No se encontró un elemento con id ${parsedId}.`,
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

  if (typeof body.name !== "string" || body.name.trim() === "") {
    errors.push("name es obligatorio y no puede estar vacío.");
  }

  if (typeof body.sku !== "string" || body.sku.trim() === "") {
    errors.push("sku es obligatorio y no puede estar vacío.");
  }

  if (
    typeof body.price !== "number" ||
    !Number.isFinite(body.price) ||
    body.price <= 0
  ) {
    errors.push("price debe ser un número finito mayor que 0.");
  }

  if (
    typeof body.stock !== "number" ||
    !Number.isInteger(body.stock) ||
    body.stock < 0
  ) {
    errors.push("stock debe ser un número entero mayor o igual que 0.");
  }

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

export function updateInventoryItem(req: Request, res: Response): void {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(400).json({
      success: false,
      message: "El ID debe ser un número entero positivo.",
    });
    return;
  }

  const item = inventory.find((i) => i.id === parsedId);

  if (!item) {
    res.status(404).json({
      success: false,
      message: `No se encontró un elemento con id ${parsedId}.`,
    });
    return;
  }

  const body = req.body as Record<string, unknown>;
  const bodyKeys = Object.keys(body);

  if (bodyKeys.length === 0) {
    res.status(400).json({
      success: false,
      message: "El body no puede estar vacío.",
    });
    return;
  }

  if ("id" in body) {
    res.status(400).json({
      success: false,
      message: "No está permitido modificar el id.",
    });
    return;
  }

  const unknownFields = bodyKeys.filter(
    (key) => !ALLOWED_FIELDS.includes(key as (typeof ALLOWED_FIELDS)[number])
  );

  if (unknownFields.length > 0) {
    res.status(400).json({
      success: false,
      message: `Campos no permitidos: ${unknownFields.join(", ")}.`,
    });
    return;
  }

  const errors: string[] = [];
  const updates: UpdateInventoryItemDTO = {};

  if ("name" in body) {
    if (typeof body.name !== "string" || body.name.trim() === "") {
      errors.push("name debe ser un string no vacío.");
    } else {
      updates.name = body.name.trim();
    }
  }

  if ("sku" in body) {
    if (typeof body.sku !== "string" || body.sku.trim() === "") {
      errors.push("sku debe ser un string no vacío.");
    } else {
      updates.sku = body.sku.trim();
    }
  }

  if ("price" in body) {
    if (
      typeof body.price !== "number" ||
      !Number.isFinite(body.price) ||
      body.price <= 0
    ) {
      errors.push("price debe ser un número finito mayor que 0.");
    } else {
      updates.price = body.price;
    }
  }

  if ("stock" in body) {
    if (
      typeof body.stock !== "number" ||
      !Number.isInteger(body.stock) ||
      body.stock < 0
    ) {
      errors.push("stock debe ser un número entero mayor o igual que 0.");
    } else {
      updates.stock = body.stock;
    }
  }

  if ("active" in body) {
    if (typeof body.active !== "boolean") {
      errors.push("active debe ser boolean (true/false, no string).");
    } else {
      updates.active = body.active;
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "Datos inválidos.",
      errors,
    });
    return;
  }

  Object.assign(item, updates);

  res.status(200).json({
    success: true,
    data: item,
  });
}

export function deleteInventoryItem(req: Request, res: Response): void {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    res.status(400).json({
      success: false,
      message: "El ID debe ser un número entero positivo.",
    });
    return;
  }

  const index = inventory.findIndex((i) => i.id === parsedId);

  if (index === -1) {
    res.status(404).json({
      success: false,
      message: `No se encontró un elemento con id ${parsedId}.`,
    });
    return;
  }

  inventory.splice(index, 1);

  res.status(204).send();
}