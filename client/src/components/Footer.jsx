import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2024 PG Management System. All rights reserved.</p>
        <div className="footer-links">
          <a href="/privacy" className="footer-link">Privacy</a>
          <a href="/terms" className="footer-link">Terms</a>
          <a href="/support" className="footer-link">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
