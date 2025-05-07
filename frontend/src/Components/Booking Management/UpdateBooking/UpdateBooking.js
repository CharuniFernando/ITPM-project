import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./updateBooking.css";

const UpdateBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {};

  const [formData, setFormData] = useState({
    name: booking.employeeDetails?.name || "",
    gmail: booking.employeeDetails?.gmail || "",
    phone: booking.employeeDetails?.phone || "",
    address: booking.employeeDetails?.address || "",
    guardType: booking.guardType || "",
    noOfGuard: booking.noOfGuard || "",
    startDate: booking.startDate || "",
    startTime: booking.startTime || "",
    endDate: booking.endDate || "",
    endTime: booking.endTime || "",
    amount: booking.amount || "",
  });

  useEffect(() => {
    if (!booking._id) {
      alert("No booking selected.");
      navigate("/bookingdash");
    }
  }, [booking._id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      
      // Auto-calculate the amount whenever relevant fields change
      if (name === "noOfGuard" || name === "startDate" || name === "startTime" || name === "endDate" || name === "endTime" || name === "guardType") {
        updatedData.amount = calculateAmount(updatedData);
      }
      return updatedData;
    });
  };

  const calculateAmount = (data) => {
    const { noOfGuard, startDate, startTime, endDate, endTime, guardType } = data;
    if (!noOfGuard || !startDate || !startTime || !endDate || !endTime || !guardType) return 0;
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const durationInHours = Math.abs((end - start) / (1000 * 60 * 60));
    const pricePerGuard = guardType === "Security Guard" ? 100 : guardType === "Female Security Guard" ? 150 : guardType === "VVIP" ? 300 : guardType === "Bodyguard" ? 200 : 100;
    return noOfGuard * pricePerGuard * durationInHours;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBooking = {
        employeeId: booking.employeeId, // Keep the original employeeId as it is
        guardType: formData.guardType,
        noOfGuard: formData.noOfGuard,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        amount: formData.amount,
      };

      await axios.put(`http://localhost:5000/api/bookings/${booking._id}`, updatedBooking);
      alert("Booking updated successfully.");
      navigate("/bookingdash");
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update booking. See console for details.");
    }
  };

  return (
    <div className="update-booking-container">
      <h1 className="admin_topic fade_up">Update Booking</h1>
      <form className="update-booking-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} disabled />
        <input type="email" name="gmail" placeholder="Gmail" value={formData.gmail} disabled />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} disabled />
        <input type="text" name="address" placeholder="Address" value={formData.address} disabled />
        
        <select name="guardType" value={formData.guardType} onChange={handleChange} required>
          <option value="">Select Guard Type</option>
          <option value="Security Guard">Security Guard</option>
          <option value="Female Security Guard">Female Security Guard</option>
          <option value="VVIP">VVIP</option>
          <option value="Bodyguard">Bodyguard</option>
        </select>

        <input type="number" name="noOfGuard" placeholder="Number of Guards" value={formData.noOfGuard} onChange={handleChange} required />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        

        <button type="submit" className="update-button">Update Booking</button>

        <div className="amount-to-pay">
          <strong>Amount to Pay: Rs.{formData.amount}</strong>
        </div>
      </form>
    </div>
  );
};

export default UpdateBooking;
