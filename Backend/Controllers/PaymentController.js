const Payment = require("../Model/Payment");
const Booking = require("../Model/Booking");

// Client updates payment status after payment
exports.recordPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, transactionId } = req.body;
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Create payment record
    const payment = new Payment({
      booking: req.params.bookingId,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus: "Completed",
    });

    await payment.save();

    // Update booking payment status
    booking.paymentStatus = "Paid";
    await booking.save();

    res.status(200).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin views all payment details
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("booking", "bookingID gmail") // Populate bookingID and gmail (proxy for name)
      .select("booking amount paymentStatus paymentMethod transactionId createdAt");

    // Map payments to the desired response format
    const paymentDetails = payments
      .filter(payment => payment.booking) // Ensure booking exists
      .map((payment) => ({
        bookingID: payment.booking.bookingID,
        name: payment.booking.gmail, // Using gmail as proxy for name
        amount: payment.amount,
        paymentStatus: payment.paymentStatus,
        paymentMethod: payment.paymentMethod,
        transactionId: payment.transactionId,
        paymentDateTime: payment.createdAt,
      }));

    if (paymentDetails.length === 0) {
      return res.status(404).json({ message: "No payments found" });
    }

    res.status(200).json(paymentDetails);
  } catch (error) {
    console.error("Error fetching payments:", error); // Log for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = exports;