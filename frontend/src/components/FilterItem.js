const FilterItem = ({ id, value, text, className = "", handleFilterClick }) => {
  return (
    <li className="filter__item">
      <button className={className} id={id} value={value} onClick={handleFilterClick}>
        {text}
      </button>
    </li>
  );
};

export default FilterItem;
