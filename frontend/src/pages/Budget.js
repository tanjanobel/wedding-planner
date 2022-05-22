import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAxios from "../utils/useAxios";
import sprite from "../icons/wedding-planner-sprite.svg";
import Expense from "../components/budget/Budget";
import SubHeader from "../components/SubHeader";
import Section from "../components/Section";
import Flashmessage from "../components/Flashmessage";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [expensesOpen, setExpensesOpen] = useState([]);
  const [expensesDone, setExpensesDone] = useState([]);
  const [statistics, setStatistics] = useState({
    wedding_budget_total: "",
    wedding_budget_spent: "",
    wedding_budget_available: ""
  });

  const { state } = useLocation();

  const api = useAxios();

  let performedAction = "";
  let isError = "";
  let title = "EXPENSE_TITLE";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    title = state.title;
  }

  useEffect(() => {
    getExpenses();
    getStatistics();
  }, []);

  useEffect(() => {
    setExpensesOpen(expenses.filter((expense) => expense.status === "Offen"));
    setExpensesDone(expenses.filter((expense) => expense.status === "Bezahlt"));
  }, [expenses]);

  const getStatistics = () => {
    api
      .get("/dashboard")
      .then((response) => {
        const data = response.data;
        setStatistics(data);
      })
      .catch((err) => console.log(err));
  };

  const getExpenses = () => {
    api
      .get("/budget")
      .then((response) => {
        const data = response.data;
        setExpenses(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <SubHeader title="Mein Budget" />
      <Section>
        <div className="summary grid-x grid-margin-x padding-bottom-2">
          <div className="card cell small-12 phablet-4">
            <div className="card__content text-center">
              <h3 className="card__heading">Budget</h3>
              <p className="card__summary">{statistics.wedding_budget_total} CHF</p>
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__content text-center">
              <h3 className="card__heading">Ausgaben</h3>
              {statistics.wedding_budget_spent > 0
                ? <p className="card__summary">{statistics.wedding_budget_spent} CHF</p>
                : <p className="card__summary">0 CHF</p>
              }
              {expenses.budget}
            </div>
          </div>
          <div className="card cell small-12 phablet-4">
            <div className="card__content text-center">
              <h3 className="card__heading">Verfügbar</h3>
              <p className="card__summary">{statistics.wedding_budget_total - statistics.wedding_budget_spent} CHF</p>
            </div>
          </div>
        </div>
        {performedAction && (
          <Flashmessage
            className="success"
            icon="#done"
            performedAction={performedAction}
            title={title}
            isError={isError}
            duration={3000}
          />
        )}
        <div className="card__button text-right padding-bottom-2">
          <Link to="/budget/add" className="button primary">
            <svg className="icon small">
              <use href={sprite + "#plus"} />
            </svg>
            <span>Ausgabe hinzufügen</span>
          </Link>
        </div>

        {expenses.length === 0 && (
          <div className="text-center">
            <svg className="icon xlarge padding-bottom-2">
              <use href={sprite + "#file"} />
            </svg>
            <h3>Keine Einträge vorhanden.</h3>
            <p>Füge jetzt deine erste Ausgabe hinzu.</p>
          </div>
        )}

        {/* Expenses open */}
        {expensesOpen &&
          expensesOpen.map((expense) => (
            <Expense
              key={expense.id}
              id={expense.id}
              title={expense.title}
              status={expense.status}
              description={expense.description}
              budget={expense.budget}
            />
          ))
        }

        {/* Expenses done */}
        {expensesDone &&
          expensesDone.map((expense) => (
            <Expense
              key={expense.id}
              id={expense.id}
              title={expense.title}
              status={expense.status}
              description={expense.description}
              budget={expense.budget}
            />
          ))
        }
      </Section>
    </>
  );
};

export default Expenses;
