import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SGS13 from '../img/SGS13.jpg';
import "./addBooking.css";

const rates = {
  "Security Guard": 100,
  "Female Security Guard": 150,
  "VVIP": 300,
  "Bodyguard": 200,
};

const AddBooking = () => {
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

  // Recalculate amount whenever form data changes
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
      const res = await axios.post("http://localhost:5000/api/bookings/create", formData);
      alert("Booking created successfully");
      navigate("/bookingdash");
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Failed to create booking. See console for details.");
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${SGS13})`,
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
          Create New Booking
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={{ fontWeight: 'bold' }}>Gmail:</label>
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold' }}>Guard Type:</label>
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
            <label style={{ fontWeight: 'bold' }}>Number of Guards:</label>
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
            <label style={{ fontWeight: 'bold' }}>Start Date:</label>
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
            <label style={{ fontWeight: 'bold' }}>Start Time:</label>
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
            <label style={{ fontWeight: 'bold' }}>End Date:</label>
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
            <label style={{ fontWeight: 'bold' }}>End Time:</label>
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
            Submit
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

export default AddBooking;
