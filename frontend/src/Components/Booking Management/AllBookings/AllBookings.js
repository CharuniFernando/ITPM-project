import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../booking.css";
import { IoIosLogOut } from "react-icons/io";

const URL = "http://localhost:5000/api/bookings/all";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(URL);
      setBookings(res.data);
      setAllBookings(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setBookings(allBookings);
      setNoResults(false);
      return;
    }

    const filtered = allBookings.filter((booking) =>
      Object.values(booking)
        .concat(Object.values(booking.employeeId || {}))
        .some((val) =>
          val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    setBookings(filtered);
    setNoResults(filtered.length === 0);
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
          "Start Date",
          "Start Time",
          "End Date",
          "End Time",
          "Amount",
        ],
      ],
      body: bookings.map((b) => [
        b.employeeId?.name || "N/A",
        b.employeeId?.gmail || "N/A",
        b.employeeId?.phone || "N/A",
        b.employeeId?.address || "N/A",
        b.guardType,
        b.startDate,
        b.startTime,
        b.endDate,
        b.endTime,
        b.amount,
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

    const confirmDelete = window.confirm("Are you sure you want to delete this Booking?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/bookings/delete/${id}`);
      console.log("Delete response:", response.data);

      const updated = bookings.filter((b) => b._id !== id);
      setBookings(updated);
      setAllBookings(updated);

      alert("Booking deleted successfully");
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      alert("Failed to delete booking. See console for details.");
    }
  };

  const handleUpdate = (id) => {
    alert(`Updating booking with ID: ${id}`);
    // Replace alert with navigation logic if needed
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
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="right-buttons">
          <button className="pdf-btn" onClick={generatePDF}>
            Generate Report
          </button>
          <button
            className="add-booking-btn"
            onClick={() => alert("Add Booking")}
          >
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
              <th>Number of Guard</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>End Date</th>
              <th>End Time</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.employeeId?.name || "N/A"}</td>
                <td>{b.employeeId?.gmail || "N/A"}</td>
                <td>{b.employeeId?.phone || "N/A"}</td>
                <td>{b.employeeId?.address || "N/A"}</td>
                <td>{b.guardType}</td>
                <td>{b.noOfGuard}</td>
                <td>{b.startDate}</td>
                <td>{b.startTime}</td>
                <td>{b.endDate}</td>
                <td>{b.endTime}</td>
                <td>{b.amount}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(b._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(b._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="logout-btn-main fade_up">
        <div
          className="logout-btn-sub"
          onClick={() => (window.location.href = "/admin")}
        >
          <IoIosLogOut className="logout-btn" />
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
