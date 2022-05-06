import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";

const DeleteExpense = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const location = useLocation();
  const { title } = location.state;

  const deleteExpense = () => {
    axios
      .delete(`/api/budget/${id}/`)
      .then((response) => {
        if (response.status.toString().startsWith("4")) {
          console.error(response.data);
          navigate("/budget", { state: { performedAction: "err_delete_expense", title: title, isError: true } });
        }
        if (response.status === 204) {
          navigate("/budget", { state: { performedAction: "delete_expense", title: title } });
        }
      })
      .catch((error) => {
        console.error(error);
        navigate("/budget", { state: { performedAction: "err_delete_expense", title: title, isError: true } });
      });
  };

  return (
    <>
      <SubHeader title="Ausgabe löschen" />
      <Section>
        <p className="text-center">
          Möchtest du die Ausgabe <b>{title}</b> wirklich löschen?
        </p>
        <div className="grid-x align-right">
          <div className="button-group">
            <Link to="/budget" className="button secondary">
              Abbrechen
            </Link>

            <button onClick={() => deleteExpense(id)} className="button primary">
              Löschen
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DeleteExpense;
