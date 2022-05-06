import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sprite from "../../icons/wedding-planner-sprite.svg";
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

    axios
      .post("/api/budget/", expenseData)
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
          <label>
            Status
            <select className="form-select" name="status" onChange={handleChange}>
              <option>Offen</option>
              <option>Bezahlt</option>
            </select>
          </label>
          <label htmlFor="title">
            Titel (Pflichtfeld)
            <input type="text" name="title" value={expense.title} onChange={handleChange} />
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
            <input type="number" name="budget" value={expense.budget} onChange={handleChange} />
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
            <textarea name="description" cols="40" rows="5" value={expense.description} onChange={handleChange} />
            {errors["description"]?.map((error) => (
              <div key={error} className="form-error">
                <svg className="card__status icon small">
                  <use href={sprite + "#exclamation"} />
                </svg>
                <span>{error}</span>
              </div>
            ))}
          </label>
          <div className="form__footer text-right">
            <div className="button-group">
              <Link to="/expenses" className="button secondary">
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
