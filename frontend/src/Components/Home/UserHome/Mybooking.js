import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SGS15 from './img/SGS15.jpg';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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

  const handleDelete = async (id) => {
    if (!id) {
      alert('Invalid booking ID');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this Booking?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/delete/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert('Booking deleted successfully');
    } catch (err) {
      console.error('Delete Error:', err.response?.data || err.message);
      alert('Failed to delete booking. See console for details.');
    }
  };

  const handleUpdate = (booking) => {
    navigate(`/update-bookingform/${booking._id}`, { state: { booking } });
  };

  useEffect(() => {
    if (gmail) {
      fetchBookings();
    }
  }, [gmail]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${SGS15})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '40px 20px',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1300px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '12px',
          padding: '30px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          margin: '20px auto',
        }}
      >
        {/* Welcome Heading with Inline CSS (Smaller with Animation) */}
        <div
          style={{
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: 'clamp(-2px, -0.15vw, -1px)',
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(45deg,#213448,#547792,#94B4C1,#6F826A)',
              backgroundSize: '200% 200%',
              animation: 'gradientAnimation 5s ease infinite',
              margin: 0,
              color: '#fff',
              fontFamily: '"Inter", "DM Sans", Arial, sans-serif',
              padding: '10px',
              WebkitBackgroundClip: 'text', // For gradient text effect
              WebkitTextFillColor: 'transparent', // Makes text transparent to show gradient
            }}
          >
            Welcome {bookings[0]?.employeeDetails?.name || 'Guest'}
          </h1>
          {/* Inline CSS for animation */}
          <style>
            {`
              @keyframes gradientAnimation {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
            `}
          </style>
        </div>

        <p
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: '1.1rem',
            marginBottom: '25px',
            lineHeight: '1.8',
            fontFamily: "'Arial', sans-serif",
          }}
        >
          Effortless control over your security services. Seamlessly review upcoming bookings, make real-time edits, or cancel appointments as your needs evolve. Keep your personal and service details up to date to avoid disruptions and ensure you continue receiving the protection you rely on. With just a few clicks, you can manage every aspect of your security with confidence and convenience anytime, anywhere.
        </p>

        {loading && (
          <p style={{ textAlign: 'center', color: '#555', fontSize: '1.1rem' }}>
            Loading bookings...
          </p>
        )}

        {error && (
          <p
            style={{
              color: '#d32f2f',
              backgroundColor: '#ffebee',
              padding: '12px',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '20px',
              fontWeight: '500',
            }}
          >
            {error}
          </p>
        )}

        {bookings.length > 0 && bookings[0].employeeDetails ? (
          <div
            style={{
              marginBottom: '30px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#273F4F',
                marginBottom: '20px',
                textAlign: 'center',
              }}
            >
              Your Booking Details
            </h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '6px',
                    fontSize: '1rem',
                  }}
                >
                  Name:
                </label>
                <span
                  style={{
                    padding: '10px',
                    display: 'block',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    fontSize: '1rem',
                  }}
                >
                  {bookings[0].employeeDetails.name || 'N/A'}
                </span>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '6px',
                    fontSize: '1rem',
                  }}
                >
                  Gmail:
                </label>
                <span
                  style={{
                    padding: '10px',
                    display: 'block',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    fontSize: '1rem',
                  }}
                >
                  {bookings[0].employeeDetails.gmail || 'N/A'}
                </span>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '6px',
                    fontSize: '1rem',
                  }}
                >
                  Phone:
                </label>
                <span
                  style={{
                    padding: '10px',
                    display: 'block',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    fontSize: '1rem',
                  }}
                >
                  {bookings[0].employeeDetails.phone || 'N/A'}
                </span>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '6px',
                    fontSize: '1rem',
                  }}
                >
                  Address:
                </label>
                <span
                  style={{
                    padding: '10px',
                    display: 'block',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px',
                    backgroundColor: '#f9f9f9',
                    color: '#333',
                    fontSize: '1rem',
                  }}
                >
                  {bookings[0].employeeDetails.address || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {bookings.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: '#212931',
                    color: 'white',
                    textAlign: 'left',
                  }}
                >
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Guard Type
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    No. of Guards
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Start Date
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    End Date
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Start Time
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    End Time
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Payment Status
                  </th>
                  <th
                    style={{
                      padding: '15px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#e3f2fd')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        index % 2 === 0 ? '#ffffff' : '#f9f9f9')
                    }
                  >
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.guardType || 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.noOfGuard || 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.startDate || 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.endDate || 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.startTime || 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.endTime || 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.amount ? `Rs.${booking.amount}` : 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                        color: '#333',
                      }}
                    >
                      {booking.paymentStatus ? `${booking.paymentStatus}` : 'N/A'}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #e0e0e0',
                        fontSize: '0.95rem',
                      }}
                    >
                      <button
                        onClick={() => handleUpdate(booking)}
                        style={{
                          padding: '8px 16px',
                          marginRight: '10px',
                          backgroundColor: '#2f5f7e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = '#2f5f7e')
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = '#2f5f7e')
                        }
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#781b19',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = '#781b19')
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = '#781b19')
                        }
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
          !loading && (
            <p
              style={{
                textAlign: 'center',
                color: '#555',
                fontSize: '1.1rem',
                marginTop: '20px',
              }}
            >
              No bookings found.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default MyBooking;