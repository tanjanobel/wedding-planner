import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import data from "../../data/menuItems.json";
import sprite from "../../icons/wedding-planner-sprite.svg";
import AuthContext from "../../context/AuthContext";

const Nav = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const menuItems = data;
  const [checked, setChecked] = useState(false);

  return (
    <>
      <input
        className="header__toggle"
        id="menu-toggle"
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(checked ? false : "expanded")}
        data-testid="menuToggle"
      />
      <label htmlFor="menu-toggle" className="header__hamburger hide-for-tablet">
        <span />
      </label>
      <nav className="header__nav">
        <ul>
          {menuItems.map((menuItem, i) => (
            <li key={i}>
              <NavLink className="header__link" to={menuItem.path} onClick={() => setChecked(false)}>
                {menuItem.name}
              </NavLink>
            </li>
          ))}
          {user ? (
            <li className="hide-for-tablet">
              <Link to="/profile" onClick={() => setChecked(false)}>
                <svg className="icon medium">
                  <use href={sprite + "#user"} />
                </svg>
                <span className="header__user">{user.first_name}</span>
              </Link>
              <button onClick={logoutUser} className="button clear black small">
                (Abmelden)
              </button>
            </li>
          ) : (
            <li className="hide-for-tablet">
              <Link to="/login" className="button clear black padding-left-0" onClick={() => setChecked(false)}>
                <svg className="icon medium">
                  <use href={sprite + "#enter"} />
                </svg>
                <span>Anmelden</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
