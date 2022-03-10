import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import moment from "moment";


const Task = () => {
  const [tasks, setTasks] = useState("");

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

  return (
    <>
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
                task.due_date ? (
                  <p className="card__text">
                    Fällig am: {moment(task.due_date).format("DD.MM.YYYY")}</p>
                ) : null
              }
            </div>
            <div className="card__buttons">
              <div className="button-group">
                <a href="/#" className="button clear small medium-gray">
                  <svg className='icon small'>
                    <use href={sprite + "#trash"}/>
                  </svg>
                  <span>Löschen</span>
                </a>
                <a href="/#" className="button clear small medium-gray">
                  <svg className='icon small'>
                    <use href={sprite + "#edit"}/>
                  </svg>
                  <span>Bearbeiten</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Task;
