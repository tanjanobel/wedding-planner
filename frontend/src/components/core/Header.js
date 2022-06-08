import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import sprite from "../../icons/wedding-planner-sprite.svg";
import AuthContext from "../../context/AuthContext";
import Nav from "./Nav";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

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
            <Nav />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
