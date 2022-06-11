import { Link } from "react-router-dom";
import moment from "moment";
import sprite from "../../icons/wedding-planner-sprite.svg";

const Task = ({ id, title, status, description, duedate }) => {
  return (
    <>
      <div className="card cell small-12" key={id} id={id} title={title}>
        <div className="card__meta">
          {(() => {
            switch (status) {
              case "In Arbeit":
                return (
                  <svg className="card__status icon large">
                    <use href={sprite + "#in-progress"} />
                  </svg>
                );
              case "Erledigt":
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
          </div>
          <div className="card__body">
            <div className="card__text">
              <p>Status: {status}</p>
              {description ? <p>Notiz: {description}</p> : null}
              {duedate ? <p>Fällig am: {moment(duedate).format("DD.MM.YYYY")}</p> : null}
            </div>
            <div className="card__buttons">
              <Link to={`/tasks/delete/${id}`} state={{ title }} className="card__button button clear black">
                <svg className="icon small">
                  <use href={sprite + "#trash"} />
                </svg>
                <span>Löschen</span>
              </Link>
              <Link to={`/tasks/edit/${id}`} className="card__button button clear black">
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

export default Task;
