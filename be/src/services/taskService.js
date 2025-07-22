import { db } from "../config/firebase.js";
import { ref, get, push, set } from "firebase/database";

export const getTasksByCard = async (boardId, cardId) => {
  const tasksRef = ref(db, `boards/${boardId}/cards/${cardId}/tasks`);
  const snapshot = await get(tasksRef);
  if (!snapshot.exists()) return [];
  const data = snapshot.val();
  return Object.entries(data).map(([id, value]) => ({
    id,
    cardId,
    title: value.title,
    description: value.description,
    status: value.status,
  }));
};

export const createTask = async (boardId, cardId, taskData, ownerId) => {
  const tasksRef = ref(db, `boards/${boardId}/cards/${cardId}/tasks`);
  const newTaskRef = push(tasksRef);
  const newTask = {
    ownerId,
    ...taskData,
  };
  await set(newTaskRef, newTask);
  return { id: newTaskRef.key, cardId, ...newTask };
};
