import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";

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

  const handleSubmit = (e) => {
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
        if (response.status === 400) {
          console.log(response.data);
          setErrors(response.data);
        }
        if (response.status === 201) {
          navigate("/tasks");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrors(error.response.data);
      })
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status
        <select
          className="form-select"
          name="status"
          onChange={handleChange}
        >
          <option>Offen</option>
          <option>In Arbeit</option>
          <option>Erledigt</option>
        </select>
      </label>
      <label htmlFor="title">
        Titel (Pflichtfeld)
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
        {errors['title']?.map(error =>
          <div
            key={error}
            className="form-error"
          >
            <svg className="card__status icon small">
              <use href={sprite + "#exclamation"}/>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </label>
      <label>
        Notiz
        <textarea
          name="description"
          cols="40"
          rows="5"
          value={task.description}
          onChange={handleChange}
        />
        {errors['description']?.map(error =>
          <div
            key={error}
            className="form-error"
          >
            <svg className="card__status icon small">
              <use href={sprite + "#exclamation"}/>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </label>
      <label>
        Fällig am
        <input
          type="date"
          name="duedate"
          value={task.duedate}
          onChange={handleChange}
        />
        {errors['duedate']?.map(error =>
          <div
            key={error}
            className="form-error"
          >
            <svg className="card__status icon small">
              <use href={sprite + "#exclamation"}/>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </label>
      <label>
        Budget
        <input
          type="number"
          name="budget"
          value={task.budget}
          onChange={handleChange}
        />
        {errors['budget']?.map(error =>
          <div
            key={error}
            className="form-error"
          >
            <svg className="card__status icon small">
              <use href={sprite + "#exclamation"}/>
            </svg>
            <span>{error}</span>
          </div>
        )}
      </label>
      <div className="form__footer text-right">
        <div className="button-group">
          <Link to="/tasks" className="button secondary">Abbrechen</Link>
          <button
            type="submit"
            className="button primary"
          >
            Speichern
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
