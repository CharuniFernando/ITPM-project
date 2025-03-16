import React from "react";
import HomeNav from "./HomeNav";
import "./home.css";
import Card1 from "./img/card1.png";
import Card2 from "./img/card2.png";
import Card3 from "./img/card3.png";
import Card4 from "./img/card4.png";
import Card5 from "./img/card5.png";
import Card6 from "./img/card6.png";
import Card7 from "./img/card7.png";
import Card8 from "./img/card8.png";
import Card9 from "./img/card7.png";
import Card10 from "./img/card10.png";
import Footer from "./Footer";
function Home() {
  return (
    <div>
      <HomeNav />
      <div className="cover_img_home">
        <div className="cover_contend">
          <p className="main_topic_home">We provide</p>
          <p className="sub_topic_home">security service</p>
          <p className="sub_para_home">
            We specialize in provding professional security services to ensure safety and peace of mind for businesses, organizations, and individuals.
          </p>
          <button className="home_btn">read more</button>
        </div>
      </div>
      <div className="home_container">
        <div>
          <h1 className="welcometopic">
            <span className="man_topic_home">Welcome SGS</span>
            <br />
            Safety Security Services
          </h1>
          <br />
          <p className="pera_welcome">
            At Secure Guard, we are committed to delivering top-tier security services
            that ensures safety and protection for businesses, organizations, and individuals.
          </p>
          <br />
          <p className="pera_welcome">
            Our highly trained security officers are equipped with the latest technology 
            and expertise to safeguard your premises, manage risks, and provide a secure environment.
            Whether you need on-site security, emergency response, or surveillance monitoring, 
            we offer tailored solution to meet your security needs.
          </p>
        </div>
      </div>
      <div className="service_con">
        <h1 className="ser_topic">Our Services</h1>
        <div className="card_full">
          <div className="card_service">
            <img src={Card5} alt="card_img" className="card_img_homeer" />
            <p className="card_topicc">Boimetric</p>
            <p>
              Monitor and control your home’s devices with enhanced smartphone
              accessibility Morbi fringilla ex ut velit…
            </p>
          </div>
          <div className="card_service">
            <img src={Card6} alt="card_img" className="card_img_homeer" />
            <p className="card_topicc">Home Security</p>
            <p>
              Monitor and control your home’s devices with enhanced smartphone
              accessibility Morbi fringilla ex ut velit…
            </p>
          </div>
          <div className="card_service">
            <img src={Card7} alt="card_img" className="card_img_homeer" />
            <p className="card_topicc">Office Security</p>
            <p>
              Monitor and control your home’s devices with enhanced smartphone
              accessibility Morbi fringilla ex ut velit…
            </p>
          </div>
          <div className="card_service">
            <img src={Card8} alt="card_img" className="card_img_homeer" />
            <p className="card_topicc">Cloud Security</p>
            <p>
              Monitor and control your home’s devices with enhanced smartphone
              accessibility Morbi fringilla ex ut velit…
            </p>
          </div>
          <div className="card_service">
            <img src={Card9} alt="card_img" className="card_img_homeer" />
            <p className="card_topicc">Personal Security</p>
            <p>
              Monitor and control your home’s devices with enhanced smartphone
              accessibility Morbi fringilla ex ut velit…
            </p>
          </div>
          <div className="card_service">
            <img src={Card10} alt="card_img" className="card_img_homeer" />
            <p className="card_topicc">Computer Security</p>
            <p>
              Monitor and control your home’s devices with enhanced smartphone
              accessibility Morbi fringilla ex ut velit…
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="home_container">
          <div className="home_card_main">
            <div className="home_card">
              <img src={Card1} alt="card img" className="card_home_img" />
              <p className="topic_home_card">27/7</p>
              <p className="para_home_card">Constant Support</p>
            </div>
            <div className="home_card">
              <img src={Card2} alt="card img" className="card_home_img" />
              <p className="topic_home_card">Qualified</p>
              <p className="para_home_card">Security Professionals</p>
            </div>
            <div className="home_card">
              <img src={Card3} alt="card img" className="card_home_img" />
              <p className="topic_home_card">Latest</p>
              <p className="para_home_card">Equipments</p>
            </div>
            <div className="home_card">
              <img src={Card4} alt="card img" className="card_home_img" />
              <p className="topic_home_card">25</p>
              <p className="para_home_card">Year Experience</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
