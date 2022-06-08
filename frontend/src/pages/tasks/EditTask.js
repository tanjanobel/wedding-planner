import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../api/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import { getTaskById, updateTask } from "../../api/Tasks";

const EditTask = () => {
  const api = useAxios();

  const navigate = useNavigate();
  let { id } = useParams();
  const countRef = useRef(0);

  const [currentTask, setCurrentTask] = useState({
    status: "",
    title: "",
    description: "",
    duedate: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getTaskById(api, id)
      .then((response) => {
        setCurrentTask({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          duedate: response.data.duedate,
        });
      })
      .catch((e) => {
        console.error(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRef]);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentTask,
    };

    updateTask(api, id, data)
      .then((response) => {
        const task = response.data;
        setCurrentTask({ ...task });
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
          <select
            className="form-select"
            name="status"
            id="status"
            value={currentTask.status}
            onChange={handleTaskChange}
          >
            <option value="Offen">Offen</option>
            <option value="In Arbeit">In Arbeit</option>
            <option value="Erledigt">Erledigt</option>
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
          <label htmlFor="duedate">Fällig am</label>
          <input
            type="date"
            name="duedate"
            id="duedate"
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
          <div className="form__footer">
            <div className="button-group">
              <Link to="/tasks" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={onUpdateClick}>
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
