import express from 'express';
import {addExpense, getExpenses, deleteExpenses} from '../controllers/expense.controller.js';
import {protect} from '../middlewares/auth.middleware.js';

const router = express.Router();
router.use(protect);

router.post('/', addExpense);
router.get('/', getExpenses);
router.delete('/:id', deleteExpenses)

export default router;