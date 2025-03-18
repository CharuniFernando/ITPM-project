import React from "react";

function Footer() {
  return (
    <div>
      <div className="footer_row">
        <div className="footer_row_card">
          <p className="footer_topic">Contact Info</p>
          <p className="conten_footer">SecureGuard</p>
          <p className="conten_footer">
            No 489/5, Galle Road, Colombo
          </p>
          <p className="conten_footer">24/7 Available</p>

          <br />
          <p className="conten_footer">Phone: +71 567 8901</p>
          <p className="conten_footer">Email: sgs@info.com</p>
          <p className="conten_footer">Fax: +77 567 8902</p>
        </div>
        <div className="footer_row_card">
          <p className="footer_topic">Our Services</p>
          <p className="conten_footer">Boimetric</p>
          <p className="conten_footer">Home Security</p>
          <p className="conten_footer">Office Security</p>
          <p className="conten_footer">Cloud Security</p>
          <p className="conten_footer">Personal Security</p>
          <p className="conten_footer">Computer Security</p>
        </div>

        <div className="footer_row_card">
          <p className="footer_topic">Quick Link</p>
          <p className="conten_footer">Home</p>
          <p className="conten_footer">About</p>
          <p className="conten_footer">Service</p>
          <p className="conten_footer">RTL Tested</p>
          <p className="conten_footer">Blog</p>
          <p className="conten_footer">contact</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
