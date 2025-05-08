import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Mybooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const gmail = location.state?.gmail || '';

  const fetchBookings = async () => {
    if (!gmail) {
      setError('No Gmail provided');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/bookings/client/${gmail}`);
      setBookings(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete booking');
    }
  };

  const handleUpdate = (bookingId) => {
    // Placeholder for update functionality
    alert(`Update booking with ID: ${bookingId}`);
    // Future implementation: Open a modal or form for updates
  };

  useEffect(() => {
    if (gmail) {
      fetchBookings();
    }
  }, [gmail]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {bookings.length > 0 && bookings[0].employeeDetails ? (
        <div style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'Arial, sans-serif' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Client Details</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Name:</label>
              <span style={{ padding: '8px', display: 'block', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {bookings[0].employeeDetails.name || 'N/A'}
              </span>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Gmail:</label>
              <span style={{ padding: '8px', display: 'block', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {bookings[0].employeeDetails.gmail || 'N/A'}
              </span>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Phone:</label>
              <span style={{ padding: '8px', display: 'block', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {bookings[0].employeeDetails.phone || 'N/A'}
              </span>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Address:</label>
              <span style={{ padding: '8px', display: 'block', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {bookings[0].employeeDetails.address || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {bookings.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px', fontFamily: 'Arial, sans-serif' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Guard Type</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>No. of Guards</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Start Date</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>End Date</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Start Time</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>End Time</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Amount</th>
                <th style={{ padding: '12px', border: '1px solid #ddd', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.guardType || 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.noOfGuard || 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.startDate || 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.endDate || 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.startTime || 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.endTime || 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>{booking.amount ? `$${booking.amount}` : 'N/A'}</td>
                  <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleUpdate(booking._id)}
                      style={{
                        padding: '8px 12px',
                        marginRight: '8px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Mybooking;