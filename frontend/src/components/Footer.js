import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top container large">
        <div className="grid-x grid-padding-y">
          <div className="footer__copyright cell small-12 tablet-6 text-center tablet-text-left">
            <p>© {new Date().getFullYear()} Wedding Planner</p>
          </div>
          <nav className="footer__nav cell small-12 tablet-6 text-center tablet-text-right">
            <ul className="footer__meta">
              <li>
                <Link to="/impressum" className="footer__link">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="footer__link">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
