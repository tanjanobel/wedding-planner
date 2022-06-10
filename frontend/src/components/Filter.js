import React from "react";

const Filter = (props) => {
  return (
    <nav className="cell small-12 tablet-auto">
      <ul className="filter">
        <li className="filter__item">
          <span>Filtern nach:</span>
        </li>
        {props.children}
      </ul>
    </nav>
  );
};

export default Filter;
