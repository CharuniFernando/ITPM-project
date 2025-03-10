import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
const URL = "http://localhost:5000/leave"; // Updated URL for leave
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
function LeaveDash() {
  const [leave, setLeave] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    fetchHandler().then((data) => {
      if (data && data.leave) {
        setLeave(data.leave);
      }
    });
  }, []);

  const handleSearch = () => {
    const filtered = leave.filter((leave) =>
      Object.values(leave).some((field) =>
        field?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setLeave(filtered);
    setNoResults(filtered.length === 0);
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("leave Report", 14, 22);

    doc.autoTable({
      startY: 30,
      head: [["Name", "Email", "Phone", "Date", "Message"]],
      body: leave.map((leave) => [
        leave.name,
        leave.email,
        leave.phone,
        leave.date,
        leave.message,
      ]),
      theme: "striped",
      margin: { top: 30 },
    });

    doc.save("leave-report.pdf");
  };
  const handlePrint = () => {
    generatePDF();
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Request?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updateleave = leave.filter((leave) => leave._id !== id);
        setLeave(updateleave);
      } catch (error) {
        console.error("Error deleting leave:", error);
      }
    }
  };
  return (
    <div>
      <h1 className="admin_topic fade_up">
        Leave <span>Details</span>
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
}

export default LeaveDash;
