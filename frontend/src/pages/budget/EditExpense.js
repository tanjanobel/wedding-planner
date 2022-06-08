import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import sprite from "../../icons/wedding-planner-sprite.svg";
import useAxios from "../../api/useAxios";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import { getExpenseById, updateExpense } from "../../api/Expenses";

const EditExpense = () => {
  const api = useAxios();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countRef]);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setCurrentExpense({ ...currentExpense, [name]: value });
  };

  const retrieveExpense = () => {
    getExpenseById(api, id)
      .then((response) => {
        const expenseData = response.data;
        setCurrentExpense({ ...expenseData });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      ...currentExpense,
    };

    updateExpense(api, id, data)
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
          <select
            className="form-select"
            name="status"
            id="status"
            value={currentExpense.status}
            onChange={handleExpenseChange}
          >
            <option value="Offen">Offen</option>
            <option value="Bezahlt">Bezahlt</option>
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
            <input
              className="input-group-field"
              type="number"
              name="budget"
              id="budget"
              value={currentExpense.budget ? currentExpense.budget : ""}
              onChange={handleExpenseChange}
            />
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
          <div className="form__footer">
            <div className="button-group">
              <Link to="/budget" className="button secondary">
                Abbrechen
              </Link>
              <button type="submit" className="button primary" onClick={onUpdateClick}>
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
