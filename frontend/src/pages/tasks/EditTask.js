import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../utils/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";

const EditTask = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initialTaskState = {
    status: "",
    title: "",
    description: "",
    duedate: "",
    budget: "",
  };

  const api = useAxios();

  let { id } = useParams();
  const [currentTask, setCurrentTask] = useState(initialTaskState);

  const countRef = useRef(0);
  useEffect(() => {
    retrieveTask();
  }, [countRef]);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const retrieveTask = () => {
    api
      .get(`/tasks/${id}`)
      .then((response) => {
        setCurrentTask({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          duedate: response.data.duedate,
          budget: response.data.budget,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateTask = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentTask,
    };
    api
      .patch(`/tasks/${id}`, data)
      .then((response) => {
        setCurrentTask({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          duedate: response.data.duedate,
          budget: response.data.budget,
        });
        if (response.status === 200) {
          navigate("/tasks", { state: { performedAction: "edit_task", title: currentTask.title } });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(error.response.data);
      });
  };

  return (
    <>
      <SubHeader title="Aufgabe bearbeiten" />
      <Section>
        <form>
          <label htmlFor="status">Status</label>
          <select className="form-select" name="status" id="status" onChange={handleTaskChange}>
            <option>Offen</option>
            <option>In Arbeit</option>
            <option>Erledigt</option>
          </select>
          <label htmlFor="title">Titel (Pflichtfeld)</label>
          <input type="text" name="title" id="title" value={currentTask.title} onChange={handleTaskChange} />
          {errors["title"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="description">Notiz</label>
          <textarea name="description" cols="40" rows="5" value={currentTask.description} onChange={handleTaskChange}/>
          {errors["description"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="duedate">Fällig am</label>
          <input type="date" name="duedate" id="duedate" value={currentTask.duedate ? currentTask.duedate : ""} onChange={handleTaskChange}/>
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
            <input className="input-group-field" type="number" name="budget" id="budget" value={currentTask.budget ? currentTask.budget : ""} onChange={handleTaskChange}/>
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
          <div className="form__footer">
            <div className="button-group">
              <Link to="/tasks" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={updateTask}>
                Speichern
              </button>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};
export default EditTask;
