import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

const MyPayment = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const { booking, clientDetails } = location.state || {};

  const [paymentData, setPaymentData] = useState({
    amount: booking?.amount || '',
    paymentMethod: 'Credit Card',
    transactionId: '',
  });
  const [currentBooking, setCurrentBooking] = useState(booking || {});
  const [currentClientDetails, setCurrentClientDetails] = useState(clientDetails || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch booking details if not provided in location.state
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!booking) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:5000/api/bookings/${bookingId}`);
          setCurrentBooking(response.data.booking);
          setCurrentClientDetails(response.data.client || {});
          setPaymentData((prev) => ({
            ...prev,
            amount: response.data.booking.amount,
          }));
        } catch (err) {
          setError('Failed to fetch booking details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookingDetails();
  }, [bookingId, booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/payments/${bookingId}/record`,
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(response.data.message);
      setPaymentData({
        amount: currentBooking.amount,
        paymentMethod: 'Credit Card',
        transactionId: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record payment');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentBooking._id) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Payment Details
      </h2>

      {/* Booking Information Section */}
      <div
        style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Booking Information
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            fontSize: '14px',
          }}
        >
          <div>
            <p style={{ color: '#6b7280', marginBottom: '4px' }}>Booking ID</p>
            <p style={{ fontWeight: '500' }}>{bookingId}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '4px' }}>Client Email</p>
            <p style={{ fontWeight: '500' }}>{currentClientDetails?.gmail || 'N/A'}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '4px' }}>Guard Type</p>
            <p style={{ fontWeight: '500' }}>{currentBooking?.guardType || 'N/A'}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '4px' }}>Number of Guards</p>
            <p style={{ fontWeight: '500' }}>{currentBooking?.noOfGuard || 'N/A'}</p>
          </div>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '4px' }}>Service Period</p>
            <p style={{ fontWeight: '500' }}>
              {currentBooking?.startDate || 'N/A'} to {currentBooking?.endDate || 'N/A'}
            </p>
          </div>
          <div>
            <p style={{ color: '#6b7280', marginBottom: '4px' }}>Service Hours</p>
            <p style={{ fontWeight: '500' }}>
              {currentBooking?.startTime || 'N/A'} - {currentBooking?.endTime || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Form Section */}
      {error && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            backgroundColor: '#dcfce7',
            color: '#15803d',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label
            htmlFor="amount"
            style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}
          >
            Amount (Rs.)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              outline: 'none',
              fontSize: '14px',
            }}
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label
            htmlFor="paymentMethod"
            style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={paymentData.paymentMethod}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
              outline: 'none',
              fontSize: '14px',
            }}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>


        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#9ca3af' : '#4f46e5',
            color: '#ffffff',
            borderRadius: '6px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          {loading ? 'Processing...' : 'Record Payment'}
        </button>
      </form>
    </div>
  );
};

export default MyPayment;