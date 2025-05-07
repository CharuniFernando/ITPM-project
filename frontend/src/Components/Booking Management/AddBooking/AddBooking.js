import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addBooking.css";

// Hourly rates
const rates = {
  "Security Guard": 100,
  "Female Security Guard": 150,
  "VVIP": 300,
  "Bodyguard": 200,
};

const AddBookingForm = () => {
  const [formData, setFormData] = useState({
    gmail: "",
    guardType: "Security Guard",
    noOfGuard: 1,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const calculateAmount = () => {
    const { guardType, startDate, endDate, startTime, endTime, noOfGuard } = formData;
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const hours = Math.max((end - start) / (1000 * 60 * 60), 0);
    return hours * rates[guardType] * noOfGuard;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Recalculate amount on relevant field change
    if (name === "guardType" || name === "noOfGuard" || name === "startDate" || name === "endDate" || name === "startTime" || name === "endTime") {
      setAmount(calculateAmount());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/bookings/create", formData);
      alert("Booking created successfully");
      navigate("/bookingdash");
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Failed to create booking. See console for details.");
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Create New Booking</h2>
      <form onSubmit={handleSubmit}>
        <label>Gmail:</label>
        <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} required />

        <label>Guard Type:</label>
        <select name="guardType" value={formData.guardType} onChange={handleChange} required>
          {Object.keys(rates).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <label>Number of Guards:</label>
        <input type="number" name="noOfGuard" value={formData.noOfGuard} min="1" onChange={handleChange} required />

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>Start Time:</label>
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <label>End Time:</label>
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />

        <button type="submit" className="sub">Submit</button>
        <p>Amount to Pay: Rs.{amount}</p>
      </form>
    </div>
  );
};

export default AddBookingForm;
