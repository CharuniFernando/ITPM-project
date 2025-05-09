import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../img/logo.png";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user ? user.type : null;
  const location = useLocation();

  const isActive = (path) => (location.pathname === path ? "nav_active" : "");

  return (
    <div>
      <div className="nav_bar_home">
        <div>
          <img src={Logo} alt="logo" className="logo_nav" />
        </div>
        <div className="nav_bar_item_main">
          <p
            className={`nav_item ${isActive("/bookingdash")}`}
            onClick={() => navigate("/bookingdash")}
          >
            Dashboard
          </p>
          <p
            className={`nav_item ${isActive("/payment-details")}`}
            onClick={() => navigate("/payment-details")}
          >
            Payment Details
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
