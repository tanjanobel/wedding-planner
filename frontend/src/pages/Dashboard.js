import React, { useEffect, useState } from "react";
import axios from "axios";
import heroImage from "../images/hero.jpg";
import Section from "../components/Section";
import Task from "../components/tasks/Task";
import SubHeader from "../components/SubHeader";
import { Link } from "react-router-dom";
import sprite from "../icons/wedding-planner-sprite.svg";

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    tasks_open_count: "",
    tasks_total_count: "",
    guests_confirmed_count: "",
    guests_total_count: "",
    next_tasks: [],
  });

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = () => {
    axios
      .get("/api/dashboard")
      .then((response) => {
        const data = response.data;
        setStatistics(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <section className="section bg-white">
        <div className="hero">
          <div className="hero__content">
            <h2>
              Plane <span>deine Hochzeit</span> online
            </h2>
            <p>
              Mit unserem digitalen Hochzeitsplaner planst du deinen grossen Tag ganz einfach und ohne grossen Aufwand.
              <br />
              Erstelle eine Liste mit den zu erledigenden Aufgaben, erfasse alle Gäste und habe dein Budget stets in
              Auge.
            </p>
            <div className="hero__footer">
              <button className="button primary large">Jetzt loslegen</button>
            </div>
          </div>
          <div className="hero__image" style={{ backgroundImage: `url(${heroImage})` }}>
            <img src={heroImage} alt={heroImage.title} />
          </div>
        </div>
      </section>
      <SubHeader title="Mein grosser Tag" />
      <Section>
        <div className="summary grid-x grid-margin-x padding-bottom-3">
          <div className="card cell small-12 phablet-6 desktop-3">
            <div className="card__body text-center">
              <h3 className="card__heading">Meine Hochzeit</h3>
              <p className="card__summary">xxx</p>
              <p className="card__text">Tage bis zur Hochzeit</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-6 desktop-3">
            <div className="card__body text-center">
              <h3 className="card__heading">Meine Aufgaben</h3>
              <p className="card__summary">{statistics.tasks_open_count}</p>
              <p className="card__text">von {statistics.tasks_total_count} erledigt</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-6 desktop-3">
            <div className="card__body text-center">
              <h3 className="card__heading">Meine Gästeliste</h3>
              <p className="card__summary">{statistics.guests_confirmed_count}</p>
              <p className="card__text">von {statistics.guests_total_count} zugesagt</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-6 desktop-3">
            <div className="card__body text-center">
              <h3 className="card__heading">Mein Budget</h3>
              <p className="card__summary">xxx CHF</p>
              <p className="card__text">von xxx CHF verfügbar</p>
            </div>
          </div>
        </div>
        <div className="padding-top-2">
          <h2 className="section__heading">Nächste Aufgaben</h2>
          {statistics.next_tasks.slice(0, 3).map((task, index) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              status={task.status}
              description={task.description}
              duedate={task.duedate}
            />
          ))}
          <div className="section__footer">
            <Link to="/tasks" className="card__button button clear">
              <span>Zu den Aufgaben</span>
              <svg className="icon small">
                <use href={sprite + "#right-arrow"} />
              </svg>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Dashboard;
