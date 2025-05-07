import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './HomeNav';
import Footer from './Footer';

// Import images directly
import SGS1 from './img/SGS1.jpg';
import SGS2 from './img/SGS2.jpg';
import SGS3 from './img/SGS3.jpg';
import SGS4 from './img/SGS4.jpg';
import SGS5 from './img/SGS5.jpg';
import SGS6 from './img/SGS6.jpg';
import SGS7 from './img/SGS7.jpg';
import SGS8 from './img/SGS8.jpg';
import SGS9 from './img/SGS9.jpg';
import SGS10 from './img/SGS10.jpg';
import SGS12 from './img/SGS12.jpg';

const Booking = () => {
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate('/my-bookings');
  };

  const handleAddBooking = () => {
    navigate('/add-booking');
  };

  // Simulate image slider with alternating display
  const [currentImage, setCurrentImage] = React.useState(0);
  const images = [SGS7, SGS10, SGS5]; // Use imported images

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Define descriptions and rates for each image
  const features = [
    { 
      img: SGS6, 
      title: 'Security Guard', 
      rate: 'Rs.100/hr', 
      description: 'Trained professionals ensuring safety at events and properties.' 
    },
    { 
      img: SGS12, 
      title: 'Female Security Guard', 
      rate: 'Rs.150/hr', 
      description: 'Skilled female guards for specialized security needs.' 
    },
    { 
      img: SGS9, 
      title: 'Bodyguard', 
      rate: 'Rs.200/hr', 
      description: 'Personal protection experts for high-risk individuals.' 
    },
    { 
      img: SGS8, 
      title: 'VVIP Protection', 
      rate: 'Rs.300/hr', 
      description: 'Elite security for dignitaries and VIPs.' 
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <Header />

      {/* Background Image Section with Description, Buttons, and Navigation Dots */}
      <div style={{ position: 'relative', width: '100%', height: '700px', overflow: 'hidden', backgroundColor: '#000000' }}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`bg-${index}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: '0',
              opacity: index === currentImage ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 1,
              filter: 'brightness(50%)' // Darken the background image for text readability
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '10%',
            color: '#fff',
            textAlign: 'left',
            zIndex: 2
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold',  color: '#f5f5f5', marginBottom: '2px' }}>
          Welcome to Our Security Service System
          </h2>
          <h1 style={{ fontSize: '72px', fontWeight: '900', lineHeight: '1.1', marginBottom: '10px' }}>
            Security.<br />Simplified.
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '500px', marginBottom: '30px', color: '#d1d5db' }}>
            We deliver smart information security solutions to protect your critical assets. Our system detects vulnerabilities, assesses risk, and keeps your business safe from evolving cyber threats.
          </p>
          <button
            onClick={handleViewBookings}
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: '#16DBF9',
              border: '2px solid #16DBF9',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease',
              marginRight: '10px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#16DBF9';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#16DBF9';
            }}
          >
            View My Bookings →
          </button>
          <button
            onClick={handleAddBooking}
            style={{
              padding: '12px 32px',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: '#16DBF9',
              border: '2px solid #16DBF9',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#16DBF9';
              e.target.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#16DBF9';
            }}
          >
            Add New Booking →
          </button>
        </div>
        {/* Navigation Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 2
          }}
        >
          {images.map((_, index) => (
            <div
              key={index}
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: index === currentImage ? '#ffffff' : 'rgba(255,255,255,0.5)',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Our Booking Facilities Description */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '40px', color: '#133639', marginBottom: '24px', textAlign: 'center' }}>
          Our Booking Facilities
        </h1>
        <p style={{ fontSize: '18px', color: '#4a5568', textAlign: 'center', maxWidth: '800px', marginBottom: '32px' }}>
          Our Security Guard Service System is designed to streamline and enhance the management of security operations. From scheduling and deployment to real-time monitoring and reporting, the system supports seamless coordination of Security Guards, Female Security Guards, VVIP Protection, and Bodyguard Services. With user-friendly interfaces, automated workflows, and secure data handling, it ensures efficient operations and complete peace of mind—every step of the way.
        </p>
      </div>

      {/* Four Image Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '100px', padding: '40px 30px', flexWrap: 'wrap', backgroundColor: '#ffffff' }}>
        {features.map((feature, num) => (
          <div key={num} style={{ textAlign: 'center', maxWidth: '200px' }}>
            <img
              src={feature.img}
              alt={feature.title}
              style={{
                width: '250px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                marginBottom: '10px',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease-in-out'
              }}
              onMouseOver={(e) => e.target.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            />
            <p style={{ fontSize: '17px', color: '#000000', marginBottom: '5px' }}>
              {feature.title}
            </p>
            <p style={{ fontSize: '13px', color: '#000000' }}>
              {feature.description}
            </p>
            <p style={{ fontSize: '14px', color: '#4a5568', marginBottom: '5px' }}>
              {feature.rate}
            </p>
          </div>
        ))}
      </div>

      <Footer style={{ height: '50px' }} />
    </div>
  );
};

export default Booking;