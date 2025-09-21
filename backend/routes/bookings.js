import express from 'express';
import { body } from 'express-validator';
import {
  getUserBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
  cancelBooking,
  getLandlordBookings
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';
import { handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

// Validation rules
const bookingValidation = [
  body('listing')
    .isMongoId()
    .withMessage('Invalid listing ID'),
  body('viewingDate')
    .isISO8601()
    .withMessage('Please provide a valid viewing date'),
  body('viewingTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time in HH:MM format'),
  body('moveInDate')
    .isISO8601()
    .withMessage('Please provide a valid move-in date'),
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('message')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Message cannot exceed 500 characters')
];

const statusUpdateValidation = [
  body('status')
    .isIn(['confirmed', 'rejected', 'completed'])
    .withMessage('Invalid status'),
  body('landlordResponse')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Response message cannot exceed 500 characters')
];

// Routes
router.get('/', protect, getUserBookings);
router.get('/landlord', protect, getLandlordBookings);
router.get('/:id', protect, getBooking);
router.post('/', protect, bookingValidation, handleValidationErrors, createBooking);
router.put('/:id/status', protect, statusUpdateValidation, handleValidationErrors, updateBookingStatus);
router.put('/:id/cancel', protect, cancelBooking);

export default router;