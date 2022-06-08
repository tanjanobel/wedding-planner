import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import useAxios from "../../api/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import { deleteExpense } from "../../api/Expenses";

const DeleteExpense = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const location = useLocation();
  const { title } = location.state;

  const api = useAxios();

  const onDeleteClick = () => {
    deleteExpense(api, id)
      .then((response) => {
        if (response.status.toString().startsWith("4")) {
          console.error(response.data);
          navigate("/budget", { state: { performedAction: "err_delete_expense", title: title, isError: true } });
        }
        if (response.status === 200) {
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

            <button onClick={onDeleteClick} className="button primary">
              Löschen
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default DeleteExpense;
