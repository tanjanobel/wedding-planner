import React, { useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const DeleteGuest = () => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
  let { id } = useParams();

  const location = useLocation();
  const { title } = location.state;

  const deleteGuest = () => {
    axios
      .delete(`/api/guests/${id}/`)
      .then((response) => {
        setDeleted(true);
        if (response.status.toString().startsWith("4")) {
          console.error(response.data);
          navigate("/guests", { state: { performedAction: "err_delete_guest", title: title, isError: true } });
        }
        if (response.status === 204) {
          navigate("/guests", { state: { performedAction: "delete_guest", title: title } });
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/guests", { state: { performedAction: "err_delete_guest", title: title, isError: true } });
      });
  };

  return (
    <>
      <SubHeader title="Gast löschen" />
      <Section>
        <p className="text-center">
          Möchtest du den Gast <b>{title}</b> wirklich löschen?
        </p>
        <div className="grid-x align-right">
          <div className="button-group">
            <Link to="/guests" className="button secondary">
              Abbrechen
            </Link>

            <button onClick={() => deleteGuest(id)} className="button primary">
              Löschen
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DeleteGuest;
