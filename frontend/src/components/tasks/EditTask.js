import {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";

import axios from "axios";

const EditTask = () => {
  const initialTaskState = {
    status: "",
    title: "",
    description: "",
    duedate: "",
    budget: "",
  };
  let { id } = useParams();
  const [currentTask, setCurrentTask] = useState(initialTaskState);

  const countRef = useRef(0);
  useEffect(() => {
    retrieveTask();
  }, [countRef]);

  const handleTaskChange = (e) => {
    const {name, value} = e.target;
    setCurrentTask({...currentTask, [name]: value});
  };
  const retrieveTask = () => {
    axios
      .get(`/api/tasks/${id}/`, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setCurrentTask({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          duedate: response.data.duedate,
          budget: response.data.budget,
        });
        console.log(currentTask);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  const updateTask = () => {
    let data = {
      status: currentTask.status,
      title: currentTask.title,
      description: currentTask.description,
      duedate: currentTask.duedate,
      budget: currentTask.budget
    };
    axios
      .put(`/api/tasks/${id}/`, data, {
        headers: {
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setCurrentTask({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          duedate: response.data.duedate,
          budget: response.data.budget,
        });
        console.log("bla")
      })
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <label>
        Status
        <select
          className="form-select"
          name="status"
          onChange={handleTaskChange}
        >
          <option>Offen</option>
          <option>In Arbeit</option>
          <option>Erledigt</option>
        </select>
      </label>
      <label>
        Titel (Pflichtfeld)
        <input
          type="text"
          name="title"
          value={currentTask.title}
          onChange={handleTaskChange}
        />
      </label>
      <label>
        Notiz
        <textarea
          name="description"
          value={currentTask.description}
          onChange={handleTaskChange}
        />
      </label>
      <label>
        Fällig am
        <input
          type="date"
          name="duedate"
          value={currentTask.duedate}
          onChange={handleTaskChange}
        />
      </label>
      <label>
        Budget
        <input
          type="number"
          name="budget"
          value={currentTask.duedate | ""}
          onChange={handleTaskChange}
        />
      </label>
      <div className="form__footer">
        <div className="button-group">
          <Link to="/tasks" className="button primary hollow">Abbrechen</Link>
          <button
            type="submit"
            className="button primary filled"
            onClick={updateTask}
          >
            Speichern
          </button>
        </div>
      </div>
    </form>
  )
}
export default EditTask;
