import React from "react";

const Footer = () => {

  return (
    <footer className="footer">
      <div className="footer__top container large">
        <div className="grid-x grid-padding-y">
          <div className="footer__copyright cell small-12 tablet-6 text-center tablet-text-left">

            <p>
              © {(new Date().getFullYear())} Wedding Planner
            </p>
          </div>
          <nav className="footer__nav cell small-12 tablet-6 text-center tablet-text-right">
            <ul className="footer__meta">
              <li>
                <a className="footer__link" href="/#">Impressum</a>
              </li>
              <li>
                <a className="footer__link" href="/#">Datenschutz</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
