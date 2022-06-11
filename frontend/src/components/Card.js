const Card = ({ topLabel, bottomLabel, data, containerClass = "card cell small-12 phablet-4" }) => {
  return (
    <div className={containerClass}>
      <div className="card__content text-center">
        <h2 className="card__heading">{topLabel}</h2>
        <p className="card__summary">{data}</p>
        {bottomLabel ? <p className="card__description">{bottomLabel}</p> : null}
      </div>
    </div>
  );
};

export default Card;
