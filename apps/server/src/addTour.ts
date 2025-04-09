import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import tours from "./addTour.json";

export const seedTours = async () => {
  try {
    const newTour = await prisma.tour.createMany({
      data: tours,
    });
    console.log("Tour added successfully:", newTour);
  } catch (error) {
    console.error("Error adding tour:", error);
  } finally {
    await prisma.$disconnect();
  }
};
seedTours();
