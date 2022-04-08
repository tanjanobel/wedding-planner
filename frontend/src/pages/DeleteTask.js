import React, {useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import SubHeader from "../components/SubHeader";

const DeleteTask = () => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  let {id} = useParams();

  const deleteTask = () => {
    axios
      .delete(`/api/tasks/${id}/`)
      .then((response) => {
        setDeleted(true);
        if (response.status === 400) {
          console.log(response.data);
        }
        if (response.status === 204) {
          navigate("/tasks");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <SubHeader title="Aufgabe löschen"/>
      <p className="text-center">Möchtest du die Aufgabe <b>xxx</b> wirklich löschen?</p>
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
    </>
  );
};

export default DeleteTask;
