import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SGS3 from './img/SGS3.jpg'; // Replace with your image path

const MyBookingDash = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/bookings/login', {
        gmail,
        password,
      });
      if (response.data.success) {
        navigate('/my-booking', { state: { gmail } });
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${SGS3})`,
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
            maxWidth: '400px',
          width: '100%',
          padding: '24px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white shade
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>
        Access Your Booking
        </h1>
        <h2 style={{ fontSize: '0.7rem',color:'rgba(19, 16, 16, 0.75)', marginBottom: '24px', textAlign: 'center' }}>
        Quickly view your reservation by logging in with your Gmail and password. Make sure your details are correct to ensure a smooth check-in experience.
        </h2>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'grid', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Gmail:</label>
              <input
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                placeholder="Enter your Gmail"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '1rem',
                }}
              />
            </div>
            {error && <p style={{ color: '#f44336', margin: '8px 0', fontSize: '0.9rem' }}>{error}</p>}
            <button
              onClick={handleSubmit}
              disabled={loading || !gmail || !password}
              style={{
                padding: '10px 16px',
                backgroundColor: loading ? '#cccccc' : '#212931',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: loading || !gmail || !password ? 'not-allowed' : 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {loading ? 'Logging in...' : 'View Booking  →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDash;