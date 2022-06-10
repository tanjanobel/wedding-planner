import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import useAxios from "../../api/useAxios";
import sprite from "../../icons/wedding-planner-sprite.svg";
import Expense from "../../components/budget/Budget";
import SubHeader from "../../components/SubHeader";
import Section from "../../components/Section";
import Flashmessage from "../../components/Flashmessage";
import { getExpenses } from "../../api/Expenses";
import { getStatistics } from "../../api/Dashboard";
import Card from "../../components/Card";
import Filter from "../../components/Filter";
import FilterItem from "../../components/FilterItem";

const Expenses = () => {
  const api = useAxios();

  const [expenses, setExpenses] = useState([]);
  const [expensesOpen, setExpensesOpen] = useState([]);
  const [expensesDone, setExpensesDone] = useState([]);
  const [statistics, setStatistics] = useState({
    wedding_budget_total: "",
    wedding_budget_spent: "",
  });
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [active, setActive] = useState("all");

  const weddingBudgetAvailable = statistics.wedding_budget_total - statistics.wedding_budget_spent;

  const { state } = useLocation();

  let performedAction = "";
  let isError = "";
  let title = "EXPENSE_TITLE";
  if (state) {
    performedAction = state.performedAction;
    isError = state.isError;
    title = state.title;
  }

  useEffect(() => {
    getExpenses(api)
      .then((response) => {
        const data = response.data;
        setExpenses(data);
      })
      .catch((err) => console.log(err));

    getStatistics(api)
      .then((response) => {
        const data = response.data;
        setStatistics(data);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setExpensesOpen(expenses.filter((expense) => expense.status === "Offen"));
    setExpensesDone(expenses.filter((expense) => expense.status === "Bezahlt"));
  }, [expenses]);

  const handleFilterClick = (e) => {
    e.preventDefault();
    setStatusFilter(e.target.value);
    setActive(e.target.id);
  };

  return (
    <>
      <SubHeader title="Mein Budget" />
      <Section>
        <div className="summary grid-x grid-margin-x padding-bottom-2">
          <Card topLabel="Budget" data={`${statistics.wedding_budget_total} CHF`} />
          <Card
            topLabel="Ausgaben"
            data={statistics.wedding_budget_spent > 0 ? statistics.wedding_budget_spent.toFixed(2) + " CHF" : "0 CHF"}
          />
          <Card topLabel="Verfügbar" data={`${weddingBudgetAvailable.toFixed(2)} CHF`} />
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

        <div className="action-bar grid-x">
          <Filter>
            <FilterItem
              className={active === "all" ? "active" : undefined}
              id="all"
              value="Alle"
              handleFilterClick={handleFilterClick}
              text="Alle"
            ></FilterItem>
            <FilterItem
              className={active === "open" ? "active" : undefined}
              id="open"
              value="Offen"
              handleFilterClick={handleFilterClick}
              text="Offen"
            ></FilterItem>
            <FilterItem
              className={active === "done" ? "active" : undefined}
              id="done"
              value="Bezahlt"
              handleFilterClick={handleFilterClick}
              text="Bezahlt"
            ></FilterItem>
          </Filter>
          <div className="card__button cell small-12 tablet-shrink text-right">
            <Link to="/budget/add" className="button primary">
              <svg className="icon small">
                <use href={sprite + "#plus"} />
              </svg>
              <span>Ausgabe hinzufügen</span>
            </Link>
          </div>
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
        {["Alle", "Offen"].indexOf(statusFilter) >= 0 &&
          expensesOpen.map((expense) => (
            <Expense
              key={expense.id}
              id={expense.id}
              title={expense.title}
              status={expense.status}
              description={expense.description}
              budget={expense.budget}
            />
          ))}

        {/* Expenses done */}
        {["Alle", "Bezahlt"].indexOf(statusFilter) >= 0 &&
          expensesDone.map((expense) => (
            <Expense
              key={expense.id}
              id={expense.id}
              title={expense.title}
              status={expense.status}
              description={expense.description}
              budget={expense.budget}
            />
          ))}
      </Section>
    </>
  );
};

export default Expenses;
