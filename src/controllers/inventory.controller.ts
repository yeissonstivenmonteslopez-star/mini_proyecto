import { Request, Response } from "express";
import { inventory } from "../data/inventory.data.js";

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