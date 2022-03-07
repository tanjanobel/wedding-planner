import React, {useState, useEffect} from "react";
import axios from "axios";
import sprite from "../../icons/wedding-planner-sprite.svg";


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
                  Fällig am: {task.due_date}</p>
              ) : null
            }
          </div>
          <div className="card__buttons">
            <div className="button-group">
              <a href="/#" className="button small medium-gray hollow">
                <svg className='icon small'>
                  <use href={sprite + "#trash"}/>
                </svg>
                <span>Löschen</span>
              </a>
              <a href="/#" className="button filled small primary">
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
  );
}

export default Task;
