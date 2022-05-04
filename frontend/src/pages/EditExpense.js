import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import sprite from "../icons/wedding-planner-sprite.svg";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";

const EditExpense = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initialExpenseState = {
    status: "",
    title: "",
    description: "",
    budget: "",
  };

  let { id } = useParams();
  const [currentExpense, setCurrentExpense] = useState(initialExpenseState);

  const countRef = useRef(0);
  useEffect(() => {
    retrieveExpense();
  }, [countRef]);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setCurrentExpense({ ...currentExpense, [name]: value });
  };

  const retrieveExpense = () => {
    axios
      .get(`/api/budget/${id}/`)
      .then((response) => {
        setCurrentExpense({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          budget: response.data.budget,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateExpense = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentExpense,
    };
    axios
      .put(`/api/budget/${id}/`, data)
      .then((response) => {
        setCurrentExpense({
          status: response.data.status,
          title: response.data.title,
          description: response.data.description,
          budget: response.data.budget,
        });
        if (response.status === 200) {
          navigate("/budget", { state: { performedAction: "edit_expense", title: currentExpense.title } });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(error.response.data);
      });
  };

  return (
    <>
      <SubHeader title="Ausgabe bearbeiten" />
      <Section>
        <form>
          <label>
            Status
            <select className="form-select" name="status" onChange={handleExpenseChange}>
              <option>Offen</option>
              <option>Bezahlt</option>
            </select>
          </label>
          <label>
            Titel (Pflichtfeld)
            <input type="text" name="title" value={currentExpense.title} onChange={handleExpenseChange} />
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
            Budget
            <input
              type="number"
              name="budget"
              value={currentExpense.budget ? currentExpense.budget : ""}
              onChange={handleExpenseChange}
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
          <label>
            Notiz
            <textarea
              name="description"
              cols="40"
              rows="5"
              value={currentExpense.description}
              onChange={handleExpenseChange}
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
          <div className="form__footer">
            <div className="button-group">
              <Link to="/budget" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={updateExpense}>
                Speichern
              </button>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};
export default EditExpense;