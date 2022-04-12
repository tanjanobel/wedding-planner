import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const DeleteTask = (props) => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  let { id } = useParams();

  const location = useLocation();
  const { title } = location.state;

  const deleteTask = () => {
    axios
      .delete(`/api/tasks/${id}/`)
      .then((response) => {
        setDeleted(true);
        if (response.status.toString().startsWith("4")) {
          console.error(response.data);
          navigate("/tasks", { state: { performedAction: "err_delete_task", title: title, isError: true } });
        }
        if (response.status === 204) {
          navigate("/tasks", { state: { performedAction: "delete_task", title: title } });
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/tasks", { state: { performedAction: "err_delete_task", title: title, isError: true } });
      });
  };

  return (
    <>
      <SubHeader title="Aufgabe löschen" />
      <Section>
        <p className="text-center">
          Möchtest du die Aufgabe <b>{title}</b> wirklich löschen?
        </p>
        <div className="grid-x align-right">
          <div className="button-group">
            <Link to="/tasks" className="button secondary">
              Abbrechen
            </Link>

            <button onClick={() => deleteTask(id)} className="button primary">
              Löschen
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DeleteTask;
