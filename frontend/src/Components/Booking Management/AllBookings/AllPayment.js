import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Import Header component (adjust path if needed)

const AllPayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments');
        setPayments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payments');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div>
      {/* Inline keyframes for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          .payment-table-row:hover {
            background: #f5f7fa;
            transform: translateY(-2px);
          }
        `}
      </style>
      <Header />
      <div style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          color: '#1a237e',
          textAlign: 'center',
          marginBottom: '30px',
          background: 'linear-gradient(45deg,rgb(0, 0, 0),rgb(255, 255, 255))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeIn 1s ease-in'
        }}>
          Payment Details
        </h2>
        {loading ? (
          <div style={{
            textAlign: 'center',
            marginTop: '50px',
            fontSize: '1.2rem',
            color: '#3f51b5',
            animation: 'pulse 1.5s infinite'
          }}>
            Loading...
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center',
            marginTop: '50px',
            fontSize: '1.2rem',
            color: '#d32f2f',
            background: '#ffebee',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            Error: {error}
          </div>
        ) : payments.length === 0 ? (
          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: '#666',
            padding: '20px',
            background: '#f9f9f9',
            borderRadius: '8px'
          }}>
            No payments found.
          </p>
        ) : (
          <div style={{
            overflowX: 'auto',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            background: '#ffffff'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{
                  background: 'linear-gradient(45deg,#0e4239,rgb(4, 44, 35))',
                  color: '#ffffff'
                }}>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #e0e0e0'
                  }}>Booking ID</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #e0e0e0'
                  }}>Gmail</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #e0e0e0'
                  }}>Amount</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #e0e0e0'
                  }}>Payment Status</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #e0e0e0'
                  }}>Payment Method</th>
                  <th style={{
                    padding: '15px',
                    textAlign: 'left',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: '2px solid #e0e0e0'
                  }}>Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.transactionId} className="payment-table-row" style={{
                    borderBottom: '1px solid #e8ecef',
                    transition: 'background 0.3s ease, transform 0.2s ease'
                  }}>
                    <td style={{ padding: '15px', color: '#333' }}>{payment.bookingID}</td>
                    <td style={{ padding: '15px', color: '#333' }}>{payment.name}</td>
                    <td style={{ padding: '15px', color: '#333' }}>Rs.{payment.amount.toFixed(2)}</td>
                    <td style={{ padding: '15px', color: '#333' }}>{payment.paymentStatus}</td>
                    <td style={{ padding: '15px', color: '#333' }}>{payment.paymentMethod}</td>
                    <td style={{ padding: '15px', color: '#333' }}>
                      {new Date(payment.paymentDateTime).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPayment;
