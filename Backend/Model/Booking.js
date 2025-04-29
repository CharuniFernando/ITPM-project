const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: () => 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  securityType: {
    type: String,
    enum: ['Security Guard', 'Female Security Guard', 'VVIP', 'Bodyguard'],
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  durationHours: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid'],
    default: 'Pending',
  },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
