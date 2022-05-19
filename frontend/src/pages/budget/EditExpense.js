import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../utils/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";

const EditExpense = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initialExpenseState = {
    status: "",
    title: "",
    description: "",
    budget: "",
  };

  const api = useAxios();

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
    api
      .get(`/budget/${id}`)
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
    api
      .patch(`/budget/${id}`, data)
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
          <label htmlFor="status">Status</label>
          <select className="form-select" name="status" id="status" onChange={handleExpenseChange}>
            <option>Offen</option>
            <option>Bezahlt</option>
          </select>
          <label htmlFor="title">Titel (Pflichtfeld)</label>
          <input type="text" name="title" id="title" value={currentExpense.title} onChange={handleExpenseChange} />
          {errors["title"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
          <label htmlFor="budget">Budget (Pflichtfeld)</label>
          <div className="input-group">
            <input className="input-group-field" type="number" name="budget" id="budget" value={currentExpense.budget ? currentExpense.budget : ""} onChange={handleExpenseChange}/>
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
          <textarea name="description" cols="40" rows="5" value={currentExpense.description} onChange={handleExpenseChange}/>
          {errors["description"]?.map((error) => (
            <div key={error} className="form-error">
              <svg className="card__status icon small">
                <use href={sprite + "#exclamation"} />
              </svg>
              <span>{error}</span>
            </div>
          ))}
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
