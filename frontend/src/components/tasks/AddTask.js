import {useState} from "react";

import axios from "axios";

const AddTask = () => {
  const [task, setTask] = useState({
    status: "Offen",
    title: "",
    description: "",
    duedate: new Date(),
    budget: "",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
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
        console.log(response.status);
        console.log(response.data);
        if (response.status === 201) {
          window.location = "/tasks"
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status
        <select
          name="status"
          onChange={handleChange}
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
          value={task.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Notiz
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Fällig am
        <input
          type="date"
          name="duedate"
          onChange={handleChange}
        />
      </label>
      <label>
        Budget
        <input
          type="number"
          name="budget"
          value={task.budget}
          onChange={handleChange}
        />
      </label>
      <button
        type="submit"
        className="button primary filled"
      >
        Aufgabe hinzufügen
      </button>
    </form>
  );
};

export default AddTask;
