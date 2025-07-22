import {db} from "../config/firebase.js";
import * as boardService from "../services/boardService.js";

export const createNewBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const board = await boardService.createBoard(db, userId, req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBoard = async (req, res) => {
  try {
    const userId = req.user.id;
    const boards = await boardService.getBoardsByUserId(db, userId);
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBoardById = async (req, res) => {
  try {
    const board = await boardService.getBoardById(db, req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const updated = await boardService.updateBoard(db, req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeBoard = async (req, res) => {
  try {
    await boardService.deleteBoard(db, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
