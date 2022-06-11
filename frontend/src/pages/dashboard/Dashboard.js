import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import dashboardMockup from "../../images/mockup-dashboard.jpg";
import heroImage from "../../images/hero.jpg";
import AuthContext from "../../context/AuthContext";
import data from "../../data/services.json";
import useAxios from "../../api/useAxios";
import Section from "../../components/Section";
import Task from "../../components/tasks/Task";
import SubHeader from "../../components/SubHeader";
import Service from "../../components/services/Service";
import { getStatistics } from "../../api/Dashboard";
import Card from "../../components/Card";

const Dashboard = () => {
  const api = useAxios();

  const { user } = useContext(AuthContext);

  const [statistics, setStatistics] = useState({
    tasks_open_count: "",
    tasks_total_count: "",
    tasks_done_count: "",
    guests_confirmed_count: "",
    guests_total_count: "",
    days_until_wedding: "",
    wedding_budget_total: "",
    wedding_budget_spent: "",
    next_tasks: [],
  });

  const weddingBudgetAvailable = statistics.wedding_budget_total - statistics.wedding_budget_spent;

  const services = data;

  useEffect(() => {
    getStatistics(api)
      .then((response) => {
        const data = response.data;
        setStatistics(data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user ? (
        <>
          <SubHeader title="Mein grosser Tag" />
          <Section>
            <div className="summary grid-x grid-margin-x grid-margin-y padding-bottom-3">
              <Card
                topLabel="Meine Hochzeit"
                data={statistics.days_until_wedding}
                bottomLabel="Tage bis zur Hochzeit"
                containerClass="card cell small-12 phablet-6 desktop-3"
              />
              <Card
                topLabel="Meine Aufgaben"
                data={statistics.tasks_done_count}
                bottomLabel={`von ${statistics.tasks_total_count} erledigt`}
                containerClass="card cell small-12 phablet-6 desktop-3"
              />
              <Card
                topLabel="Meine Gästeliste"
                data={statistics.guests_confirmed_count}
                bottomLabel={`von ${statistics.guests_total_count} zugesagt`}
                containerClass="card cell small-12 phablet-6 desktop-3"
              />
              <Card
                topLabel="Mein Budget"
                data={`${weddingBudgetAvailable.toFixed(2)} CHF`}
                bottomLabel={`von ${statistics.wedding_budget_total} CHF verfügbar`}
                containerClass="card cell small-12 phablet-6 desktop-3"
              />
            </div>

            {statistics.next_tasks.length > 0 && (
              <section className="padding-top-2">
                <h2 className="section__heading">Nächste Aufgaben</h2>
                <div className="grid-x grid-margin-x grid-margin-y">
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
                </div>
                <div className="section__footer">
                  <Link to="/tasks" className="card__button button clear black">
                    <svg className="icon medium">
                      <use href={sprite + "#right-arrow"} />
                    </svg>
                    <span>Zu den Aufgaben</span>
                  </Link>
                </div>
              </section>
            )}
          </Section>
        </>
      ) : (
        <>
          <section className="section bg-white">
            <div className="hero">
              <div className="hero__content">
                <h1>
                  Plane <span>deine Hochzeit</span> online
                </h1>
                <p>
                  Mit unserem digitalen Hochzeitsplaner planst du deinen grossen Tag ganz einfach und ohne grossen
                  Aufwand.
                  <br />
                  Erstelle eine Liste mit den zu erledigenden Aufgaben, erfasse alle Gäste und habe dein Budget stets
                  in Auge.
                </p>
                <div className="hero__footer">
                  <Link to="/login" className="button primary large">
                    Jetzt loslegen
                  </Link>
                </div>
              </div>
              <div className="hero__image" style={{ backgroundImage: `url(${heroImage})` }}>
                <img src={heroImage} alt={heroImage.title} />
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
                <img src={dashboardMockup} alt="Dashboard" />
              </div>
            </div>
          </Section>
        </>
      )}
    </>
  );
};

export default Dashboard;
