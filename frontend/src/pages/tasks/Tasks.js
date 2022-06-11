import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../api/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import Task from "../../components/tasks/Task";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";
import Card from "../../components/Card";
import { getTasks } from "../../api/Tasks";
import Filter from "../../components/Filter";
import FilterItem from "../../components/FilterItem";

const Tasks = () => {
  const api = useAxios();

  const [tasks, setTasks] = useState([]);
  const [tasksOpen, setTasksOpen] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [active, setActive] = useState("all");

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

  const handleFilterClick = (e) => {
    e.preventDefault();
    setStatusFilter(e.target.value);
    setActive(e.target.id);
  };

  return (
    <>
      <SubHeader title="Meine Aufgaben" />
      <Section>
        <div className="summary grid-x grid-margin-x grid-margin-y margin-bottom-2">
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

        <div className="action-bar grid-x">
          <Filter>
            <FilterItem
              className={active === "all" ? "active" : undefined}
              id="all"
              value="Alle"
              handleFilterClick={handleFilterClick}
              text="Alle"
            ></FilterItem>
            <FilterItem
              className={active === "open" ? "active" : undefined}
              id="open"
              value="Offen"
              handleFilterClick={handleFilterClick}
              text="Offen"
            ></FilterItem>
            <FilterItem
              className={active === "in progress" ? "active" : undefined}
              id="in progress"
              value="In Arbeit"
              handleFilterClick={handleFilterClick}
              text="In Arbeit"
            ></FilterItem>
            <FilterItem
              className={active === "done" ? "active" : undefined}
              id="done"
              value="Erledigt"
              handleFilterClick={handleFilterClick}
              text="Erledigt"
            ></FilterItem>
          </Filter>
          <div className="card__button cell small-12 tablet-shrink text-right">
            <Link to="/tasks/add" className="button primary">
              <svg className="icon small">
                <use href={sprite + "#plus"} />
              </svg>
              <span>Aufgabe hinzufügen</span>
            </Link>
          </div>
        </div>

        <div className="grid-x grid-margin-x grid-margin-y">
          <div className="cell small-12">
            {tasks.length === 0 && (
              <div className="text-center padding-top-3">
                <svg className="icon xlarge padding-bottom-2">
                  <use href={sprite + "#file"} />
                </svg>
                <h3>Keine Einträge vorhanden.</h3>
                <p>Füge jetzt deine erste Aufgabe hinzu.</p>
              </div>
            )}
          </div>

          {/* Tasks open */}
          {["Alle", "Offen"].indexOf(statusFilter) >= 0 &&
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
          {["Alle", "In Arbeit"].indexOf(statusFilter) >= 0 &&
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
          {["Alle", "Erledigt"].indexOf(statusFilter) >= 0 &&
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
        </div>
      </Section>
    </>
  );
};

export default Tasks;
