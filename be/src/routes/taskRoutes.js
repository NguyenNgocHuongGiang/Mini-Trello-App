import express from "express";
import { getTasks, createTask } from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router({ mergeParams: true });

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);

export default router;
