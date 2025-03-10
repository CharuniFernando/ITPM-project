import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import HomeNav from "../../Home/UserHome/HomeNav";
import Footer from "../../Home/UserHome/Footer";

function AddLeave() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Email validation for Gmail
     const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
     if (!emailRegex.test(inputs.email)) {
       window.alert("Please enter a valid Gmail address ending with @gmail.com");
       return; // Stop form submission if invalid
     }
    console.log(inputs);
    await sendRequest();
    window.alert("Request Send successfully!");
    window.location.href = "/home";
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/leave", {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      date: inputs.date,
      message: inputs.message,
    });
  };
  return (
    <div>
      <HomeNav />
      <br /> <br /> <br />

      <br /> <br /> <br />
      <Footer />
    </div>
  );
}

export default AddLeave;
