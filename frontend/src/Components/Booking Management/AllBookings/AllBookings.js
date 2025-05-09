import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import "../booking.css";
import { IoIosLogOut } from "react-icons/io";

const URL = "http://localhost:5000/api/bookings/all";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(URL);
      setBookings(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setNoResults(false);
      return;
    }

    const filtered = bookings.filter((booking) => {
      const combinedData = {
        ...booking,
        ...booking.employeeDetails,
      };
      return Object.values(combinedData)
        .some((val) =>
          val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    setNoResults(filtered.length === 0);
    setBookings(filtered);
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
          "Gmail",
          "Phone",
          "Address",
          "Guard Type",
          "Number of Guards",
          "Start Date",
          "Start Time",
          "End Date",
          "End Time",
          "Amount",
          "Payment Status"
        ],
      ],
      body: bookings.map((b) => [
        b.employeeDetails?.name || "N/A",
        b.employeeDetails?.gmail || b.gmail || "N/A",
        b.employeeDetails?.phone || "N/A",
        b.employeeDetails?.address || "N/A",
        b.guardType,
        b.noOfGuard,
        b.startDate,
        b.startTime,
        b.endDate,
        b.endTime,
        b.amount,
        b.paymentStatus,
      ]),
      theme: "striped",
      margin: { top: 30 },
    });

    doc.save("bookings-report.pdf");
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Invalid booking ID");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/delete/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      alert("Booking deleted successfully");
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      alert("Failed to delete booking. See console for details.");
    }
  };

  const handleUpdate = (booking) => {
    navigate(`/update-booking/${booking._id}`, { state: { booking } });
  };

  const handleAddBooking = () => {
    navigate("/add-booking");
  };

  return (
    <div className="booking-container">
      <h1 className="admin_topic fade_up">
        Booking <span>Details</span>
      </h1>

      <div className="top-bar fade_up">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="right-buttons">
          <button className="pdf-btn" onClick={generatePDF}>
            Generate Report
          </button>
          <button className="add-booking-btn" onClick={handleAddBooking}>
            Add Booking
          </button>
        </div>
      </div>

      {noResults ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table fade_up">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gmail</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Guard Type</th>
              <th>Number of Guards</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>End Date</th>
              <th>End Time</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.employeeDetails?.name || "N/A"}</td>
                <td>{b.employeeDetails?.gmail || b.gmail || "N/A"}</td>
                <td>{b.employeeDetails?.phone || "N/A"}</td>
                <td>{b.employeeDetails?.address || "N/A"}</td>
                <td>{b.guardType}</td>
                <td>{b.noOfGuard}</td>
                <td>{b.startDate}</td>
                <td>{b.startTime}</td>
                <td>{b.endDate}</td>
                <td>{b.endTime}</td>
                <td>{b.amount}</td>
                <td>{b.paymentStatus}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(b._id)}>
                    Delete
                  </button>
                  <button className="update-btn" onClick={() => handleUpdate(b)}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllBookings;