import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../utils/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";

const AddExpense = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [expense, setExpense] = useState({
    status: "Offen",
    title: "",
    description: "",
    duedate: "",
    budget: "",
  });

  const api = useAxios();

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const addExpense = (e) => {
    setErrors([]);

    e.preventDefault();
    const expenseData = {
      status: expense.status,
      title: expense.title,
      description: expense.description,
      budget: expense.budget,
    };

    api
      .post("/budget", expenseData)
      .then((response) => {
        if (response.status === 201) {
          navigate("/budget", { state: { performedAction: "add_expense", title: expense.title } });
        }
      })
      .catch((error) => {
        console.error(error);
        setErrors(error.response.data);
      });
  };

  return (
    <>
      <SubHeader title="Ausgabe hinzufügen" />
      <Section>
        <form>
          <label htmlFor="status">Status</label>
          <select className="form-select" name="status" onChange={handleChange}>
            <option>Offen</option>
            <option>Bezahlt</option>
          </select>
          <label htmlFor="title">Titel (Pflichtfeld)</label>
          <input type="text" name="title" value={expense.title} onChange={handleChange} />
          {errors["title"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="budget">Budget</label>
          <div className="input-group">
            <input className="input-group-field" type="number" name="budget" value={expense.budget} onChange={handleChange} />
            <div className="input-group-icon">
              <span>CHF</span>
            </div>
          </div>
          {errors["budget"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="description">Notiz</label>
          <textarea name="description" cols="40" rows="5" value={expense.description} onChange={handleChange} />
          {errors["description"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <div className="form__footer text-right">
            <div className="button-group">
              <Link to="/budget" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={addExpense}>
                Speichern
              </button>
            </div>
          </div>
        </form>
      </Section>
    </>
  );
};

export default AddExpense;
