import {Link} from "react-router-dom";
import moment from "moment";
import sprite from "../../icons/wedding-planner-sprite.svg";

const Task = ({id, title, status, description, duedate}) => {
  return (
    <>
      {/*{deleted && (*/}
      {/*  <Flashmessage className="success" icon="#done" text="Aufgabe erfolgreich gelöscht."/>*/}
      {/*)}*/}
      <div className="card" key={id} id={id} title={title}>
        <div className="card__meta">
          {(() => {
            switch (status) {
              case "In Arbeit":
                return <svg className="card__status icon large">
                  <use href={sprite + "#in-progress"}/>
                </svg>
              case "Erledigt":
                return <svg className="card__status icon large">
                  <use href={sprite + "#done"}/>
                </svg>
              default:
                return <svg className="card__status icon large">
                  <use href={sprite + "#open"}/>
                </svg>
            }
          })()}
        </div>

        <div className="card__body">
          <h3 className="card__heading">
            {title}
          </h3>
          <p className="card__text">
            Status: {status}
          </p>
          {
            description ? (
              <p className="card__text">
                Notiz: {description}</p>
            ) : null
          }
          {
            duedate ? (
              <p className="card__text">
                Fällig am: {moment(duedate).format("DD.MM.YYYY")}</p>
            ) : null
          }
        </div>

        <div className="card__buttons">
          <Link
            to={`/tasks/delete/${id}`}
            className="card__button button clear black"
          >
            <svg className='icon small'>
              <use href={sprite + "#trash"}/>
            </svg>
            <span>Löschen</span>
          </Link>
          {/*</button>*/}
          <Link
            to={`/tasks/${id}`}
            className="card__button button clear black"
          >
            <svg className='icon small'>
              <use href={sprite + "#edit"}/>
            </svg>
            <span>Bearbeiten</span>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Task;
