const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/PaymentController");


// Client updates payment status after payment
router.post("/payment/:bookingId", paymentController.recordPayment);

// Admin views all payment details
router.get("/payments", paymentController.getAllPayments);

module.exports = router;