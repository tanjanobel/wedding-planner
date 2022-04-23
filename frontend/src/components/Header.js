import { useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../images/logo.svg";
import sprite from "../icons/wedding-planner-sprite.svg";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {}, []);

  return (
    <>
      <header className="header">
        <div className="header__top show-for-tablet">
          <div className="container large">
            <div className="grid-x">
              <div className="header__slogan cell small-12 tablet-6">
                <span>Happily ever after...</span>
              </div>
              <div className="header__user cell small-12 tablet-6">
                {user ? (
                  <>
                    <Link to="/profile">
                      <svg className="icon medium">
                        <use href={sprite + "#user"} />
                      </svg>
                      <span className="header__user">{user.first_name}</span>
                    </Link>
                    <button onClick={logoutUser} className="button clear black small">
                      (Abmelden)
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="button clear black">
                    <svg className="icon medium">
                      <use href={sprite + "#enter"} />
                    </svg>
                    <span>Anmelden</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
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
                <li>
                  <NavLink to="/" className="header__link">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/tasks" className="header__link">
                    Aufgaben
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/guests" className="header__link">
                    Gästeliste
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/budget" className="header__link">
                    Budget
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wedding" className="header__link">
                    Hochzeit
                  </NavLink>
                </li>
                {user ? (
                  <li className="hide-for-tablet">
                    <Link to="/profile">
                      <svg className="icon medium">
                        <use href={sprite + "#user"} />
                      </svg>
                      <span className="header__user">{user.username}</span>
                    </Link>
                    <button onClick={logoutUser} className="button clear black small">
                      (Abmelden)
                    </button>
                  </li>
                ) : (
                  <li className="hide-for-tablet">
                    <Link to="/login" className="button clear black padding-left-0">
                      <svg className="icon medium">
                        <use href={sprite + "#enter"} />
                      </svg>
                      <span>Anmelden</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
