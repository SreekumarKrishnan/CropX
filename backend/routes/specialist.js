import express from "express";
import {
  displayAllSpecialist,
  getSpecialistProfile,
  updateSpecialistData,
  addExperience,
  deleteExperience,
  addSlot,
  deleteSlot,
  getSpecialistProfileById,
  cancelBooking,
  completeBooking
} from "../controllers/specialistController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

router.get(
  "/allSpecialists",
  authenticate,
  restrict(["farmer"]),
  displayAllSpecialist
);
router.get(
  "/profile",
  authenticate,
  restrict(["specialist"]),
  getSpecialistProfile
);
router.get(
  "/profileById/:id",
  authenticate,
  getSpecialistProfileById
);
router.put(
  "/updateSpecialist/:id",
  authenticate,
  restrict(["specialist"]),
  updateSpecialistData
);
router.put(
  "/addExperience/:id",
  authenticate,
  restrict(["specialist"]),
  addExperience
);
router.put(
  "/deleteExperience/:id",
  authenticate,
  restrict(["specialist"]),
  deleteExperience 
);
router.put(
  "/addSlot/:id", 
  authenticate,
  restrict(["specialist"]),
  addSlot
);
router.put(
  "/deleteSlot/:id",
  authenticate,
  restrict(["specialist"]),
  deleteSlot 
);
router.put(
  "/cancelBooking/:id1/:id2",
  authenticate,
  restrict(["specialist","farmer"]),
  cancelBooking 
);
router.put(
  "/completeBooking/:id",
  authenticate,
  restrict(["specialist"]),
  completeBooking 
);

export default router;
