import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import sprite from "../icons/wedding-planner-sprite.svg";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

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
      .put(`/tasks/${id}`, data)
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
          <label>
            Status
            <select className="form-select" name="status" onChange={handleTaskChange}>
              <option>Offen</option>
              <option>In Arbeit</option>
              <option>Erledigt</option>
            </select>
          </label>
          <label>
            Titel (Pflichtfeld)
            <input type="text" name="title" value={currentTask.title} onChange={handleTaskChange} />
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
            <textarea
              name="description"
              cols="40"
              rows="5"
              value={currentTask.description}
              onChange={handleTaskChange}
            />
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
            <input
              type="date"
              name="duedate"
              value={currentTask.duedate ? currentTask.duedate : ""}
              onChange={handleTaskChange}
            />
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
            <input
              type="number"
              name="budget"
              value={currentTask.budget ? currentTask.budget : ""}
              onChange={handleTaskChange}
            />
            {errors["budget"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
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
