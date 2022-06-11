import sprite from "../../icons/wedding-planner-sprite.svg";

const Service = ({ title, description, icon }) => {
  return (
    <div className="cell small-12 tablet-4 service">
      <div className="service__icon">
        <svg className="icon">
          <use href={`${sprite}#${icon}`} />
        </svg>
      </div>
      <h2 className="service__heading">{title}</h2>
      <p className="service__text">{description}</p>
    </div>
  );
};

export default Service;
