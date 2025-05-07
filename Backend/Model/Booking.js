const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  bookingID: {
    type: String,
    unique: true,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  gmail: {
    type: String,
    required: true,
  },
  guardType: {
    type: String,
    enum: ["Security Guard", "Female Security Guard", "VVIP", "Bodyguard"],
    required: true,
  },
  noOfGuard: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

// Auto-generate unique bookingID
BookingSchema.pre("validate", function (next) {
  if (!this.bookingID) {
    this.bookingID = `BOOK-${Date.now()}`;
  }
  next();
});

module.exports = mongoose.model("Booking", BookingSchema);
