import type { Request, Response } from "express";
import { inventory } from "../data/inventory.data.js";

export const getInventory = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: inventory,
    total: inventory.length
  });
};