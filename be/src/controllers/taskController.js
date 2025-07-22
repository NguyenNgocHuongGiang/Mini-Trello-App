import * as taskService from "../services/taskService.js";


export const getTasks = async (req, res) => {
  const { boardId, id: cardId } = req.params;
  try {
    const tasks = await taskService.getTasksByCard(boardId, cardId);
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Failed to get tasks", error });
  }
};


export const createTask = async (req, res) => {
  const { boardId, id: cardId } = req.params;
  const ownerId = req.user?.id;
  const { title, description, status } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "Title and status are required" });
  }

  try {
    const task = await taskService.createTask(boardId, cardId, { title, description, status }, ownerId);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create task", error });
  }
};
