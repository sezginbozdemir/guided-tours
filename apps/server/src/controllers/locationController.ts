import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class LocationController {
  static async getLocations(req: Request, res: Response) {
    try {
      const locations = await prisma.location.findMany({});

      res.json(locations);
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ error: `Failed to fetch locations: ${error.message}` });
    }
  }
  static async createLocation(req: Request, res: Response) {
    const { name, description, images, popular } = req.body;
    if (!name || !images || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const newLocation = await prisma.location.create({
        data: {
          name,
          images,
          description,
          popular: popular ?? false,
        },
      });
      res.status(201).json(newLocation);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to create location: ${error.message}` });
    }
  }
  static async deleteLocation(req: Request, res: Response) {
    const { id } = req.params;
    const numericId = Number(id);
    try {
      const location = await prisma.location.findUnique({
        where: { id: numericId },
      });

      if (!location) {
        return res.status(404).json({ error: "Location not found" });
      }

      await prisma.location.delete({
        where: { id: numericId },
      });

      res.status(200).json({ message: "Location deleted successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to delete location: ${error.message}` });
    }
  }
}

export default LocationController;
