const express = require('express');
const router = express.Router();
const { bookTable, getUserBookings, deleteBooking } = require('../controllers/tableController');
const { protect } = require('../middleware/authMiddleware');

// Use the correct middleware name: protect
router.post('/', protect, bookTable);
router.get('/', protect, getUserBookings);
router.delete('/:tableId', protect, deleteBooking);

module.exports = router;
