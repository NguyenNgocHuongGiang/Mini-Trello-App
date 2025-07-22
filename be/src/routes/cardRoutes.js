import express from 'express';
import {
  getAllCards,
  getCardById,
  getCardsByUser,
  createCard,
  updateCard,
  deleteCard,
  inviteToBoard,
  acceptCardInvite
} from '../controllers/cardController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

router.use(verifyToken);

router.get('/', getAllCards);

router.get('/:id', getCardById);
router.get('/user/:user_id', getCardsByUser);

// /**
//  * @swagger
//  * /cards:
//  *   post:
//  *     summary: Tạo mới một card
//  *     tags: [Cards]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Tạo thành công
//  */
router.post('/', verifyToken, createCard);
router.put('/:id', updateCard);
router.delete('/:id', deleteCard);


export default router;
