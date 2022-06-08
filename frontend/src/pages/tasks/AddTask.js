import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../api/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import { saveTask } from "../../api/Tasks";

const AddTask = () => {
  const api = useAxios();

  const navigate = useNavigate();

  const [task, setTask] = useState({
    status: "Offen",
    title: "",
    description: "",
    duedate: "",
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSaveClick = (e) => {
    setErrors([]);
    e.preventDefault();

    const taskData = {
      status: task.status,
      title: task.title,
      description: task.description,
      duedate: task.duedate,
    };

    saveTask(api, taskData)
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
            <option value="Offen">Offen</option>
            <option value="In Arbeit">In Arbeit</option>
            <option value="Erledigt">Erledigt</option>
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
          <div className="form__footer text-right">
            <div className="button-group">
              <Link to="/tasks" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={onSaveClick}>
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
