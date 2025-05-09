import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SGS13 from './img/SGS13.jpg';

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
      navigate("/booking");
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
        fontFamily: '"Roboto", Arial, sans-serif',
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: '32px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <h2
          style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#111827',
          }}
        >
          Create New Booking
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gap: '20px',
          }}
        >
          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Gmail
            </label>
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Guard Type
            </label>
            <select
              name="guardType"
              value={formData.guardType}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            >
              {Object.keys(rates).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Number of Guards
            </label>
            <input
              type="number"
              name="noOfGuard"
              value={formData.noOfGuard}
              min="1"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: '#111827',
                fontSize: '0.9rem',
                fontWeight: '500',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '1rem',
                fontFamily: '"Roboto", Arial, sans-serif',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#16DBF9';
                e.target.style.boxShadow = '0 0 0 3px rgba(22, 219, 249, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(90deg,rgb(64, 89, 99),rgb(30, 62, 74),rgb(64, 98, 149))',
              color: '#111827',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s ease, transform 0.2s ease',
              marginTop: '16px',
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'linear-gradient(90deg,rgb(64, 98, 149), rgb(30, 62, 74),rgb(64, 89, 99))';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'linear-gradient(90deg,rgb(64, 89, 99),rgb(30, 62, 74),rgb(64, 98, 149))';
              e.target.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.target.style.transform = 'scale(1.05)'}
          >
            Submit Booking
          </button>
          <p
            style={{
              margin: '12px 0',
              textAlign: 'center',
              color: '#111827',
              fontWeight: '500',
              fontSize: '1.1rem',
            }}
          >
            Amount to Pay: Rs.{amount}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddBookingForm;