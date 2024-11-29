// Footer.js
import React from "react";
import "./Footer.css"; // Link to the new Footer.css file
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/process", label: "Process" },
    { href: "/crowdfunding-gallery", label: "All Projects" },
    { href: "/terms", label: "T&C" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} VinylFunders. All rights reserved.</p>
        <ul className="footer-links">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
