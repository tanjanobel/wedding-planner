import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import moment from "moment";
import Flashmessage from "../Flashmessage";


const Task = () => {
  const [tasks, setTasks] = useState("");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    getTasks()
  }, [])

  const getTasks = () => {
    axios
      .get("/api/tasks/")
      .then((response) => {
        const data = response.data;
        setTasks(data)
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    axios
      .delete(`/api/tasks/${id}/`)
      .then((response) => {
        setDeleted(true);
        getTasks();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {deleted && (
        <Flashmessage className="success" icon="#done" text="Aufgabe erfolgreich gelöscht." />
      )}
      <div className="card__button text-right padding-bottom-2">
        <Link to="/tasks/add" className="button filled primary">
          <svg className="icon medium">
            <use href={sprite + "#plus"}/>
          </svg>
          <span>Aufgabe hinzufügen</span>
        </Link>
      </div>
      <div className="card__container">
        {tasks && tasks.map(task =>
          <div
            className="card"
            key={task.id}
            id={task.id}

            title={task.title}
          >
            <div className="card__meta">
              {(() => {
                switch (task.status) {
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
                {task.title}
              </h3>
              <p className="card__text">
                Status: {task.status}
              </p>
              {
                task.description ? (
                  <p className="card__text">
                    Notiz: {task.description}</p>
                ) : null
              }
              {
                task.duedate ? (
                  <p className="card__text">
                    Fällig am: {moment(task.duedate).format("DD.MM.YYYY")}</p>
                ) : null
              }
            </div>
            <div className="card__buttons">
              <div className="button-group">
                <button
                  className="button clear small black"
                  onClick={() => deleteTask(task.id)}
                >
                  <svg className='icon small'>
                    <use href={sprite + "#trash"}/>
                  </svg>
                  <span>Löschen</span>
                </button>
                <Link to={`/tasks/${task.id}`}
                  className="button clear small black"
                >
                  <svg className='icon small'>
                    <use href={sprite + "#edit"}/>
                  </svg>
                  <span>Bearbeiten</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Task;
