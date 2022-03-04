import React from "react";
import logo from "../images/logo.svg";
import sprite from "../icons/wedding-planner-sprite.svg";

const Header = () => {

  return (
    <header className="header">
      <div className="header__bottom">
        <div className="container large">
          <div className="header__logo">
            <a href="/">
              <img src={logo} alt="Wedding Planner" />
            </a>
          </div>
          <input type="checkbox" className="header__toggle" id="menu-toggle" />
            <label htmlFor="menu-toggle" className="header__hamburger hide-for-tablet">
              <span></span>
            </label>
            <nav className="header__nav">
              <ul>
                <li><a className="header__link" href="/#">Dashboard</a></li>
                <li><a className="header__link" href="/#">Aufgaben</a></li>
                <li><a className="header__link" href="/#">Gästeliste</a></li>
                <li><a className="header__link" href="/#">Budget</a></li>
                <li><a className="header__link" href="/#">Hochzeit</a></li>
                <li>
                  <a href="/#">
                    <svg className='icon medium'>
                      <use href={sprite + "#user"} />
                    </svg>
                    <span className="header__user">Hanna</span>
                  </a>
                </li>
              </ul>
            </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
