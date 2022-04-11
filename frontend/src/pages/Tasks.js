import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import Task from "../components/tasks/Task";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import Flashmessage from "../components/Flashmessage";

const Tasks = (props) => {
  const [tasks, setTasks] = useState([]);
  const { state } = useLocation();
  let performedAction = "";
  let isError = "";
  let title = "TASK_TITLE";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    title = state.title;
  }

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios
      .get("/api/tasks/")
      .then((response) => {
        const data = response.data;
        setTasks(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SubHeader title="Meine Aufgaben" />
      <Section>
        {performedAction && (
          <Flashmessage
            className="success"
            icon="#done"
            performedAction={performedAction}
            title={title}
            isError={isError}
            duration={3000}
          />
        )}
        <div className="card__button text-right padding-bottom-2">
          <Link to="/tasks/add" className="button primary">
            <svg className="icon small">
              <use href={sprite + "#plus"} />
            </svg>
            <span>Aufgabe hinzufügen</span>
          </Link>
        </div>

        {tasks &&
          tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
              duedate={task.duedate}
            />
          ))}
      </Section>
    </>
  );
};

export default Tasks;
