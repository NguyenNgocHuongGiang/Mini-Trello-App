import express from 'express';
import { createNewBoard, getAllBoard, getBoardById, removeBoard, updateBoard } from '../controllers/boardController.js';
import { verifyToken } from '../middlewares/auth.js';
import { acceptCardInvite, inviteToBoard } from '../controllers/cardController.js';


const router = express.Router();

router.post('/', verifyToken, createNewBoard);
router.get('/', verifyToken, getAllBoard);
router.get('/:id', verifyToken, getBoardById);
router.put('/:id', verifyToken, updateBoard);
router.delete('/:id', verifyToken, removeBoard);
router.post('/:id/invite', verifyToken, inviteToBoard);
router.post('/:id/invite/accept', verifyToken, acceptCardInvite);


export default router;