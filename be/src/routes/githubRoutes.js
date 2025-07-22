import express from "express";
import { getTasks, createTask } from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/auth.js";


const router = express.Router({ mergeParams: true });

// router.get("/repositories/:repositoryId/github-info",verifyToken, getGitHubInfo);

export default router;
