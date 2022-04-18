import { NavLink } from "react-router-dom";
import logo from "../images/logo.svg";
import sprite from "../icons/wedding-planner-sprite.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  const checkAuthStatus = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("wedding-planner-access-token")}`,
      },
    };
    axios
      .get("/api/auth", config)
      .then((response) => {
        setIsAuthenticated(true);
        setUsername(response.data["username"]);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        setUsername("");
      });
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <>
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
                <li>
                  <div>
                    <svg className="icon medium">
                      <use href={sprite + "#user"} />
                    </svg>
                    <span className="header__user">
                      {isAuthenticated ? (
                        <Link to="/profile">Eingeloggt als {username} </Link>
                      ) : (
                        <Link to="/login">Einloggen</Link>
                      )}
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
