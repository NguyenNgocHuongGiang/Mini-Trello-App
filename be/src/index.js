import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dotenv from "dotenv";
import { swaggerUi, specs } from './config/swagger.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/boards", boardRoutes);
app.use("/boards/:boardId/cards", cardRoutes);
app.use("/boards/:boardId/cards/:id/tasks", taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});
