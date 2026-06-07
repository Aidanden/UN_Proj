import { Router } from "express";
import { DepartmentController } from "../controllers/departmentController";
import { errorHandler } from "../middlewares/errorHandler";


const router = Router();

router.get("/",DepartmentController.getAll);
router.get("/:id", DepartmentController.getById);
router.post("/", DepartmentController.create);
router.put("/:id", DepartmentController.update);
router.delete("/:id", DepartmentController.delete);



export default router;

