import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import AddExpense from "../AddExpense";

describe('Add expense page', () => {

  test('Renders addExpense',() => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    const h1 = 'Ausgabe hinzufügen';
    expect(h1).toMatch(/Ausgabe hinzufügen/);
  });

  test('renders save link', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    const saveLink: HTMLAnchorElement[] = screen.getAllByRole('button');
    expect(saveLink[0].textContent).toEqual('Speichern');
  });

  test('renders cancel link', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    const cancelLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(cancelLink[0].textContent).toEqual('Abbrechen');
    expect(cancelLink[0].href).toContain('/budget');
  });

  test('should correctly set default option', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByRole('option', {name: 'Offen'}).selected).toBe(true);
  });

  test('should display the correct number of options', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    expect(screen.getAllByRole('option').length).toBe(2);
  });

  test('should allow user to change status', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', {name: 'Bezahlt'}),
    )
    expect(screen.getByRole('option', {name: 'Bezahlt'}).selected).toBe(true);
  });

  test('Title input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    const titleInput = screen.getByLabelText('Titel (Pflichtfeld)');
    const testValue = 'test';
    fireEvent.change(titleInput, {target: {value: testValue}});
    expect(titleInput.value).toBe(testValue);
  });

  test('Budget input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <AddExpense />
        </AuthProvider>
      </Router>
    );
    const budgetInput = screen.getByLabelText('Budget (Pflichtfeld)');
    const testValue = '200';
    fireEvent.change(budgetInput, {target: {value: testValue}});
    expect(budgetInput.value).toBe(testValue);
  });
});
