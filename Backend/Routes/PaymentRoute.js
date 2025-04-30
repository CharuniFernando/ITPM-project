import express from 'express';
import {
  createPayment,
  getUserPayments,
  getPaymentById,
} from './Controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPayment);
router.get('/', protect, getUserPayments);
router.get('/:id', protect, getPaymentById);

export default router;
