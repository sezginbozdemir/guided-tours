import { Router } from "express";
import LocationController from "../controllers/locationController";

const router = Router();

router.get("/locations", LocationController.getLocations);
router.post("/locations", async (req, res) => {
  await LocationController.createLocation(req, res);
});
router.delete("/locations/:id", async (req, res) => {
  await LocationController.deleteLocation(req, res);
});
export default router;
