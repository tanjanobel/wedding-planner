import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../api/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import Task from "../../components/tasks/Task";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";
import { Card } from "../../components/Card";
import { getTasks } from "../../api/Tasks";

const Tasks = () => {
  const api = useAxios();

  const { state } = useLocation();

  const [tasks, setTasks] = useState([]);
  const [tasksOpen, setTasksOpen] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  let performedAction = "";
  let isError = "";
  let title = "TASK_TITLE";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    title = state.title;
  }

  useEffect(() => {
    getTasks(api)
      .then((response) => setTasks(response.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTasksOpen(tasks.filter((task) => task.status === "Offen"));
    setTasksInProgress(tasks.filter((task) => task.status === "In Arbeit"));
    setTasksDone(tasks.filter((task) => task.status === "Erledigt"));
  }, [tasks]);

  return (
    <>
      <SubHeader title="Meine Aufgaben" />
      <Section>
        <div className="summary grid-x grid-margin-x padding-bottom-2">
          <Card topLabel="Offen" data={tasksOpen.length}></Card>
          <Card topLabel="In Arbeit" data={tasksInProgress.length}></Card>
          <Card topLabel="Erledigt" data={tasksDone.length}></Card>
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

        {tasks.length === 0 && (
          <div className="text-center">
            <svg className="icon xlarge padding-bottom-2">
              <use href={sprite + "#file"} />
            </svg>
            <h3>Keine Einträge vorhanden.</h3>
            <p>Füge jetzt deine erste Aufgabe hinzu.</p>
          </div>
        )}

        {/* Tasks open */}
        {tasksOpen &&
          tasksOpen.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
              duedate={task.duedate}
            />
          ))}

        {/* Tasks in progress*/}
        {tasksInProgress &&
          tasksInProgress.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
              duedate={task.duedate}
            />
          ))}

        {/* Tasks done */}
        {tasksDone &&
          tasksDone.map((task) => (
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
