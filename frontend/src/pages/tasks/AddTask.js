import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";

const AddTask = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [task, setTask] = useState({
    status: "Offen",
    title: "",
    description: "",
    duedate: "",
    budget: "",
  });

  const api = useAxios();

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = (e) => {
    setErrors([]);

    e.preventDefault();
    const taskData = {
      status: task.status,
      title: task.title,
      description: task.description,
      duedate: task.duedate,
      budget: task.budget,
    };

    api
      .post("/tasks", taskData)
      .then((response) => {
        if (response.status === 201) {
          navigate("/tasks", { state: { performedAction: "add_task", title: task.title } });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(error.response.data);
      });
  };

  return (
    <>
      <SubHeader title="Aufgabe hinzufügen" />
      <Section>
        <form>
          <label htmlFor="status">Status</label>
          <select className="form-select" name="status" id="status" onChange={handleChange}>
            <option>Offen</option>
            <option>In Arbeit</option>
            <option>Erledigt</option>
          </select>
          <label htmlFor="title">Titel (Pflichtfeld)</label>
          <input type="text" name="title" id="title" value={task.title} onChange={handleChange} />
          {errors["title"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="description">Notiz</label>
          <textarea name="description" cols="40" rows="5" value={task.description} onChange={handleChange} />
          {errors["description"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="duedate">Fällig am</label>
          <input type="date" name="duedate" id="duedate" value={task.duedate} onChange={handleChange} />
          {errors["duedate"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="budget">Budget</label>
          <div className="input-group">
            <input className="input-group-field" type="number" name="budget" id="budget" value={task.budget} onChange={handleChange} />
            <div className="input-group-icon">
              <span>CHF</span>
            </div>
          </div>
          {errors["budget"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <div className="form__footer text-right">
            <div className="button-group">
              <Link to="/tasks" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={addTask}>
                Speichern
              </button>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};

export default AddTask;
