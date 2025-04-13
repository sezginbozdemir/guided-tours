import { Router } from "express";
import TourController from "../controllers/tourController";

const router = Router();

router.get("/tours", TourController.getTours);
router.post("/tours", async (req, res) => {
  await TourController.createTour(req, res);
});
router.delete("/tours/:id", async (req, res) => {
  await TourController.deleteTour(req, res);
});

export default router;
