import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class TourController {
  static async getTours(req: Request, res: Response) {
    try {
      const location = req.query.location as string | undefined;

      const tours = await prisma.tour.findMany({
        where: location
          ? { location: { equals: location, mode: "insensitive" } }
          : {},
      });

      res.json(tours);
    } catch (error: any) {
      console.log(error);
      res
        .status(500)
        .json({ error: `Failed to fetch tours: ${error.message}` });
    }
  }
  static async createTour(req: Request, res: Response) {
    const {
      title,
      location,
      price,
      tags,
      images,
      description,
      shortDescription,
      duration,
      tourDetails,
      label,
    } = req.body;
    try {
      JSON.parse(tourDetails);
    } catch (error) {
      return res.status(400).json({ error: "Invalid JSON in tourDetails" });
    }
    if (
      !title ||
      !location ||
      !price ||
      !tags ||
      !images ||
      !description ||
      !tourDetails ||
      !duration ||
      !shortDescription
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    try {
      const newTour = await prisma.tour.create({
        data: {
          title,
          location,
          price,
          tags,
          images,
          description,
          shortDescription,
          duration,
          tourDetails: JSON.parse(tourDetails),
          label: label || null,
        },
      });
      res.status(201).json(newTour);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to create tour: ${error.message}` });
    }
  }
  static async deleteTour(req: Request, res: Response) {
    const { id } = req.params;
    const numericId = Number(id);
    try {
      const tour = await prisma.tour.findUnique({
        where: { id: numericId },
      });

      if (!tour) {
        return res.status(404).json({ error: "Tour not found" });
      }

      await prisma.tour.delete({
        where: { id: numericId },
      });

      res.status(200).json({ message: "Tour deleted successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to delete Tour: ${error.message}` });
    }
  }
}

export default TourController;
