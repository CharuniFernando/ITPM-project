import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import SGS14 from './img/SGS14.jpg';

// Hourly rates
const rates = {
  "Security Guard": 100,
  "Female Security Guard": 150,
  "VVIP": 300,
  "Bodyguard": 200,
};

const UpdateBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {};

  const [formData, setFormData] = useState({
    name: booking.employeeDetails?.name || "",
    gmail: booking.employeeDetails?.gmail || "",
    phone: booking.employeeDetails?.phone || "",
    address: booking.employeeDetails?.address || "",
    guardType: booking.guardType || "Security Guard",
    noOfGuard: booking.noOfGuard || 1,
    startDate: booking.startDate || "",
    endDate: booking.endDate || "",
    startTime: booking.startTime || "",
    endTime: booking.endTime || "",
  });

  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!booking._id) {
      navigate("/my-booking", { state: { gmail: formData.gmail } });
    }
  }, [booking._id, navigate]);

  // Recalculate amount whenever relevant form data changes
  useEffect(() => {
    const { guardType, startDate, endDate, startTime, endTime, noOfGuard } = formData;

    if (startDate && endDate && startTime && endTime && noOfGuard > 0) {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);

      if (end > start) {
        const hours = (end - start) / (1000 * 60 * 60); // exact hours
        const total = hours * rates[guardType] * noOfGuard;
        setAmount(Math.round(total));
      } else {
        setAmount(0);
      }
    } else {
      setAmount(0);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "noOfGuard" ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedBooking = {
        employeeId: booking.employeeId,
        guardType: formData.guardType,
        noOfGuard: formData.noOfGuard,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        amount: amount, // Use calculated amount
      };

      await axios.put(`http://localhost:5000/api/bookings/${booking._id}`, updatedBooking);
      alert("Booking updated successfully.");
      navigate("/my-booking", { state: { gmail: formData.gmail } });
    } catch (err) {
      console.error("Update Error:", err);
      alert("Failed to update booking. See console for details.");
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${SGS14})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '550px',
          width: '100%',
          padding: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
          Update Booking
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              disabled
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Gmail:</label>
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              disabled
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              disabled
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              disabled
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Guard Type:</label>
            <select
              name="guardType"
              value={formData.guardType}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              {Object.keys(rates).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Number of Guards:</label>
            <input
              type="number"
              name="noOfGuard"
              value={formData.noOfGuard}
              min="1"
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Start Time:</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>End Time:</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            className="sub"
            style={submitButtonStyle}
          >
            Update Booking
          </button>
          <p style={{ margin: '8px 0', fontSize: '1rem', textAlign: 'center' }}>
            Amount to Pay: Rs.{amount}
          </p>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontFamily: 'Arial, sans-serif',
  fontSize: '1rem',
};

const submitButtonStyle = {
  padding: '10px 16px',
  backgroundColor: '#212931',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
};

export default UpdateBookingForm;