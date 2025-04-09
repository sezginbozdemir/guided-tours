import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class TourController {
  static async getTours(req: Request, res: Response) {
    try {
      const tours = await prisma.tour.findMany();
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
        },
      });
      res.status(201).json(newTour);
    } catch (error: any) {
      res
        .status(500)
        .json({ error: `Failed to create tour: ${error.message}` });
    }
  }
}

export default TourController;
