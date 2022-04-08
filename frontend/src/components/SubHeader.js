import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import sprite from "../icons/wedding-planner-sprite.svg";

const SubHeader = ({ title }) => {

  return (
    <>
      <header className="subheader">
        <div className="container">
          <h1>{title}</h1>
        </div>
      </header>
    </>
  )
}

export default SubHeader;
