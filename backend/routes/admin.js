import express from "express";
import {
  getAllSpecialists,
  getAllUsers,
  blockUser,
  blockSpecialist,
  approveSpecialist,
  addSpecialization,
  getAllSpecialization
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/allUsers", getAllUsers);
router.get("/allSpecialists", getAllSpecialists);
router.put("/blockUser/:id", blockUser);
router.put("/blockSpecialist/:id", blockSpecialist);
router.put("/approveSpecialist/:id", approveSpecialist);
router.post("/addSpecialization", addSpecialization)
router.get("/allSpecialization", getAllSpecialization)

export default router;
