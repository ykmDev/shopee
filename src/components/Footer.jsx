// import icon
import { useRef, useState } from "react";
import useLogout from "../hooks/useLogout";

const Footer = () => {
  const logout = useLogout();
  const menuToggleBtnRef = useRef(null);
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer-list">
          <div className="media">
            <h3 className="footer-ttl">Follow Us</h3>
            <ul className="media-list">
              <li className="item">
                <a href="#" target="_blank">
                  <i className="fa-brands fa-square-facebook"></i>
                  <span>Facebook</span>
                </a>
              </li>
              <li className="item">
                <a href="#" target="_blank">
                  <i className="fa-brands fa-square-twitter"></i>
                  <span>Twitter</span>
                </a>
              </li>
              <li className="item">
                <a href="#" target="_blank">
                  <i className="fa-brands fa-line"></i>
                  <span>Line</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="about-us">
            <h3 className="footer-ttl">About Us</h3>
            <ul className="about-list">
              <li className="item">
                <a href="#">Shop Mall</a>
              </li>
              <li className="item">
                <a href="#">Sell Center</a>
              </li>
              <li className="item">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="payment">
            <h3 className="footer-ttl">Payment</h3>
            <ul className="pay-list">
              <li>
                <img src="./images/pay_01.png" alt="" />
              </li>
              <li>
                <img src="./images/pay_02.png" alt="" />
              </li>
              <li>
                <img src="./images/pay_03.png" alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="copyright">© 2024 NangSiriWann. All Rights Reserved .</p>
    </footer>
  );
};

export default Footer;
