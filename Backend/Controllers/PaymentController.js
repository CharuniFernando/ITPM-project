import Payment from './Model/Payment.js';
import Booking from './Model/Booking.js';

// Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, amount } = req.body;
    const userId = req.user.id;

    // Ensure booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Create payment
    const payment = new Payment({
      bookingId,
      userId,
      paymentMethod,
      amount,
      status: 'Completed',
    });

    await payment.save();

    // Update booking payment status
    booking.paymentStatus = 'Paid';
    await booking.save();

    res.status(201).json({ message: 'Payment successful', payment });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
};

// Get all payments by user
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).populate('bookingId');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve payments', error });
  }
};

// Get one payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('bookingId');
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error });
  }
};
