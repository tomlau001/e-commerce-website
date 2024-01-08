import React from "react";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div id="footer">
        <h2>ONLINE SHOP</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          unde?
        </p>
        <div className="media-icons">
          <Link href="https://www.facebook.com/" target="_blank">
            <FaFacebook className="media-icon" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <FaInstagram className="media-icon" />
          </Link>
          <Link href="https://www.github.com/" target="_blank">
            <FaGithub className="media-icon" />
          </Link>
          <Link href="https://www.twitter.com/" target="_blank">
            <FaTwitter className="media-icon" />
          </Link>
        </div>
      </div>
      <div className="copyright">Copyright &copy; 2023 ONLINE SHOP</div>
    </>
  );
};

export default Footer;
