import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import sprite from "../icons/wedding-planner-sprite.svg";

const Header = () => {

  return (
    <>
      <header className="header">
        <div className="header__bottom">
          <div className="container large">
            <div className="header__logo">
              <a href="/">
                <img src={logo} alt="Wedding Planner"/>
              </a>
            </div>
            <input type="checkbox" className="header__toggle" id="menu-toggle"/>
            <label htmlFor="menu-toggle" className="header__hamburger hide-for-tablet">
              <span></span>
            </label>
            <nav className="header__nav">
              <ul>
                <li><Link to="/" className="header__link">Dashboard</Link></li>
                <li><Link to="/tasks" className="header__link">Aufgaben</Link></li>
                <li><Link to="/guests" className="header__link">Gästeliste</Link></li>
                <li><Link to="/budget" className="header__link">Budget</Link></li>
                <li><Link to="/wedding" className="header__link">Hochzeit</Link></li>
                <li>
                  <a href="/#">
                    <svg className='icon medium'>
                      <use href={sprite + "#user"}/>
                    </svg>
                    <span className="header__user">Hanna</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
