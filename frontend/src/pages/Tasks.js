import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import Task from "../components/tasks/Task";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const Tasks = () => {
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
      <SubHeader title="Meine Aufgaben"/>
      <Section>
        <div className="card__button text-right padding-bottom-2">
          <Link to="/tasks/add" className="button primary">
            <svg className="icon small">
              <use href={sprite + "#plus"}/>
            </svg>
            <span>Aufgabe hinzufügen</span>
          </Link>
        </div>

        {tasks && tasks.map(task =>
          <Task
            key={task.id}
            id={task.id} title={task.title}
            status={task.status}
            description={task.description}
            duedate={task.duedate}
          />
        )}
      </Section>
    </>
  )
}

export default Tasks;
