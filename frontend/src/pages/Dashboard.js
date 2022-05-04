import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import dashboardMockup from "../images/mockup-dashboard.jpg";
import heroImage from "../images/hero.jpg";
import Section from "../components/Section";
import Task from "../components/tasks/Task";
import SubHeader from "../components/SubHeader";
import Service from "../components/services/Service";
import AuthContext from "../context/AuthContext";
import data from "../data/services.json";

const Dashboard = () => {
  const {user} = useContext(AuthContext);

  const [statistics, setStatistics] = useState({
    tasks_open_count: "",
    tasks_total_count: "",
    guests_confirmed_count: "",
    guests_total_count: "",
    next_tasks: [],
  });

  const services = data;

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
      {user
        ?
        <>
          <SubHeader title="Mein grosser Tag"/>
          <Section>
            <div className="summary grid-x grid-margin-x padding-bottom-3">
              <div className="card cell small-12 phablet-6 desktop-3">
                <div className="card__content text-center">
                  <h3 className="card__heading">Meine Hochzeit</h3>
                  <p className="card__summary">xxx</p>
                  <p className="card__description">Tage bis zur Hochzeit</p>
                </div>
              </div>
              <div className="card cell small-12 phablet-6 desktop-3">
                <div className="card__content text-center">
                  <h3 className="card__heading">Meine Aufgaben</h3>
                  <p className="card__summary">{statistics.tasks_open_count}</p>
                  <p className="card__description">von {statistics.tasks_total_count} erledigt</p>
                </div>
              </div>
              <div className="card cell small-12 phablet-6 desktop-3">
                <div className="card__content text-center">
                  <h3 className="card__heading">Meine Gästeliste</h3>
                  <p className="card__summary">{statistics.guests_confirmed_count}</p>
                  <p className="card__description">von {statistics.guests_total_count} zugesagt</p>
                </div>
              </div>
              <div className="card cell small-12 phablet-6 desktop-3">
                <div className="card__content text-center">
                  <h3 className="card__heading">Mein Budget</h3>
                  <p className="card__summary">xxx CHF</p>
                  <p className="card__description">von xxx CHF verfügbar</p>
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
                <Link to="/tasks" className="card__button button clear black">
                  <svg className="icon medium">
                    <use href={sprite + "#right-arrow"}/>
                  </svg>
                  <span>Zu den Aufgaben</span>
                </Link>
              </div>
            </div>
          </Section>
        </>
        :
        <>
          <section className="section bg-white">
            <div className="hero">
              <div className="hero__content">
                <h2>
                  Plane <span>deine Hochzeit</span> online
                </h2>
                <p>
                  Mit unserem digitalen Hochzeitsplaner planst du deinen grossen Tag ganz einfach und ohne grossen
                  Aufwand.
                  <br/>
                  Erstelle eine Liste mit den zu erledigenden Aufgaben, erfasse alle Gäste und habe dein Budget stets
                  in
                  Auge.
                </p>
                <div className="hero__footer">
                  <Link to="/login" className="button primary large">Jetzt loslegen</Link>
                </div>
              </div>
              <div className="hero__image" style={{backgroundImage: `url(${heroImage})`}}>
                <img src={heroImage} alt={heroImage.title}/>
              </div>
            </div>
          </section>
          <Section>
            <div className="grid-x grid-margin-x grid-margin-y">
            {services.map((service, i) => (
              <Service key={i} {...service} />
              ))}
            </div>
          </Section>
          <Section className="bg-white">
            <div className="grid-x grid-margin-x grid-margin-y align-middle">
              <div className="cell small-12 desktop-6">
                <h2 className="section__subheading">Behalte den Überblick</h2>
                <p>
                  Wie viele Aufgaben sind noch zu erledigen? Habe ich an alle Gäste gedacht? Ist noch genügend Budget
                  vorhanden? - Alle diese Fragen werden dir mit unserem digitalen Hochzeitsplaner auf einen Blick
                  beantwortet.
                </p>
              </div>
              <div className="cell small-12 desktop-6">
                <img src={dashboardMockup} alt="Dashboard"/>
              </div>
            </div>
          </Section>
        </>
      }
    </>
  );
};

export default Dashboard;
