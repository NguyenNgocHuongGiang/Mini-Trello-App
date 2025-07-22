import * as cardService from '../services/cardService.js';
import {db} from '../config/firebase.js';

export const getAllCards = async (req, res) => {
  try {
    const cards = await cardService.getAllCards(db, req.params.boardId, req.user.id);
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await cardService.getCardById(db, req.params.boardId, req.params.id);
    res.status(200).json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCardsByUser = async (req, res) => {
  try {
    const cards = await cardService.getCardsByUser(db, req.params.boardId, req.params.user_id);
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const card = await cardService.createCard(db, req.params.boardId,req.body );
    res.status(201).json(card);
  } catch (err) {
    console.log(err);    
    res.status(500).json({ error: err.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const updated = await cardService.updateCard(db, req.params.boardId, req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    await cardService.deleteCard(db, req.params.boardId, req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const inviteToBoard = async (req, res) => {
  try {
    await cardService.inviteToBoard(db, req.params.id, req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const acceptCardInvite = async (req, res) => {
  try {
    console.log(req.body);
    
    await cardService.acceptCardInvite(db, req.params.id, req.body);
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: err.message });
  }
};
