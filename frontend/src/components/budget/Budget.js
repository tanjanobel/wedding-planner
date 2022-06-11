import { Link } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";

const Expense = ({ id, title, status, budget, description }) => {
  return (
    <>
      <div className="card cell small-12" key={id} id={id} title={title}>
        <div className="card__meta">
          {(() => {
            switch (status) {
              case "Bezahlt":
                return (
                  <svg className="card__status icon large">
                    <use href={sprite + "#done"} />
                  </svg>
                );
              default:
                return (
                  <svg className="card__status icon large">
                    <use href={sprite + "#open"} />
                  </svg>
                );
            }
          })()}
        </div>
        <div className="card__content">
          <div className="card__header">
            <div className="card__title">
              <h2 className="card__heading">{title}</h2>
            </div>
            <div className="card__budget tablet-text-right">
              <span className="card__heading">{budget} CHF</span>
            </div>
          </div>
          <div className="card__body">
            <div className="card__text">
              <p>Status: {status}</p>
              {description ? <p>Notiz: {description}</p> : null}
            </div>
            <div className="card__buttons">
              <Link to={`/budget/delete/${id}`} state={{ title }} className="card__button button clear black">
                <svg className="icon small">
                  <use href={sprite + "#trash"} />
                </svg>
                <span>Löschen</span>
              </Link>
              <Link to={`/budget/edit/${id}`} className="card__button button clear black">
                <svg className="icon small">
                  <use href={sprite + "#edit"} />
                </svg>
                <span>Bearbeiten</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expense;
