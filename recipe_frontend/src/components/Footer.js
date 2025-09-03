import React from 'react';
import './footer.css';

// PUBLIC_INTERFACE
export default function Footer() {
  /** App footer with simple links. */
  return (
    <footer className="footer">
      <div className="container footer-row">
        <span>© {new Date().getFullYear()} Recipe Explorer</span>
        <nav className="footer-links">
          <a href="#about">About</a>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
