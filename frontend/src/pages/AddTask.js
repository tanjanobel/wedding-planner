import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

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

    axios
      .post("/api/tasks/", taskData)
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
          <label>
            Status
            <select className="form-select" name="status" onChange={handleChange}>
              <option>Offen</option>
              <option>In Arbeit</option>
              <option>Erledigt</option>
            </select>
          </label>
          <label htmlFor="title">
            Titel (Pflichtfeld)
            <input type="text" name="title" value={task.title} onChange={handleChange} />
            {errors["title"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label>
            Notiz
            <textarea name="description" cols="40" rows="5" value={task.description} onChange={handleChange} />
            {errors["description"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label>
            Fällig am
            <input type="date" name="duedate" value={task.duedate} onChange={handleChange} />
            {errors["duedate"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <label>
            Budget
            <input type="number" name="budget" value={task.budget} onChange={handleChange} />
            {errors["budget"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
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
