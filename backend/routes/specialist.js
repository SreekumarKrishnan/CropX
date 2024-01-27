import express from "express"
import { displayAllSpecialist, getSpecialistProfile, updateSpecialistData, addExperience } from "../controllers/specialistController.js"
import { authenticate, restrict } from "../auth/verifyToken.js"
const router = express.Router()

router.get("/allSpecialists", authenticate, restrict(["farmer"]), displayAllSpecialist )
router.get("/profile", authenticate, restrict(["specialist"]), getSpecialistProfile)
router.put("/updateSpecialist/:id", authenticate,restrict(["specialist"]), updateSpecialistData)
router.put("/addExperience/:id", authenticate, restrict(["specialist"]), addExperience)

export default router