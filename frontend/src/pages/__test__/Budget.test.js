import {render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Budget from "../Budget";
import Expense from "../../components/budget/Budget";

describe('Budget page', () => {

  test('Renders budget',() => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
    const h1 = 'Mein Budget';
    expect(h1).toMatch(/Mein Budget/);
  });

  test('renders h3 budget total', () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
    const h3 = 'Budget';
    expect(h3).toMatch('Budget');
  });

  test('renders h3 expenses', () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
    const h3 = 'Ausgaben';
    expect(h3).toMatch('Ausgaben');
  });

  test('renders h3 budget available', () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
    const h3 = 'Verfügbar';
    expect(h3).toMatch('Verfügbar');
  });

  test('renders add expense link', () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
    const addExpenseLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(addExpenseLink[0].textContent).toEqual('Ausgabe hinzufügen');
    expect(addExpenseLink[0].href).toContain('/budget/add');
  });

  test('Renders expense component',() => {
    render(
      <Router>
        <AuthProvider>
          <Budget>
            <Expense />
          </Budget>
        </AuthProvider>
      </Router>
    );
  });
});
