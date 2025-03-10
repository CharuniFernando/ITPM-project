import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../booking.css";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

const URL = "http://localhost:5000/bookings"; // Updated URL for bookings
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.bookings) {
        setBookings(data.bookings);
      }
    });
  }, []);

  const handleSearch = () => {
    const filteredBookings = bookings.filter((booking) =>
      Object.values(booking).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBookings(filteredBookings);
    setNoResults(filteredBookings.length === 0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Bookings Report", 14, 22);

    doc.autoTable({
      startY: 30,
      head: [
        [
          "Name",
          "Email",
          "Phone",
          "Packages",
          "Date",
          "Payment Status",
          "Security Officer",
          "Special Instructions",
        ],
      ],
      body: bookings.map((booking) => [
        booking.name,
        booking.email,
        booking.phone,
        booking.packages,
        booking.date,
        booking.securityOfficer || "N/A",
        booking.specialInstructions || "None",
      ]),
      theme: "striped",
      margin: { top: 30 },
    });

    doc.save("bookings-report.pdf");
  };

  const handlePrint = () => {
    generatePDF();
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this Booking Details?")
    ) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updateBooking = bookings.filter((booking) => booking._id !== id);
        setBookings(updateBooking);
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="admin_topic fade_up">
        Booking <span>Details</span>
      </h1>
      <div>
        <div className="logout_btn_main">
          <div
            className="logout_btn_sub fade_up"
            onClick={() => (window.location.href = "/admin")}
          >
            <IoIosLogOut className="logout_btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
