import { Router } from "express";
import { InstructorController } from "../controllers/instructorController";

const router = Router();

router.get("/", InstructorController.getAll);
router.get("/:id", InstructorController.getById);
router.post("/", InstructorController.create);
router.put("/:id", InstructorController.update);
router.delete("/:id", InstructorController.delete);

export default router;