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
  const [tasksOffen, setTasksOffen] = useState([]);
  const [tasksInArbeit, setTasksInArbeit] = useState([]);
  const [tasksErledigt, setTasksErledigt] = useState([]);

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

  useEffect(() => {
    setTasksOffen(tasks.filter((task) => task.status === "Offen"));
    setTasksInArbeit(tasks.filter((task) => task.status === "In Arbeit"));
    setTasksErledigt(tasks.filter((task) => task.status === "Erledigt"));
  }, [tasks]);

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
        <div className="summary grid-x grid-margin-x padding-bottom-2">
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Offen</h3>
              <p className="card__summary">{tasksOffen.length}</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">In Arbeit</h3>
              <p className="card__summary">{tasksInArbeit.length}</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__body text-center">
              <h3 className="card__heading">Erledigt</h3>
              <p className="card__summary">{tasksErledigt.length}</p>
            </div>
          </div>
        </div>
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
