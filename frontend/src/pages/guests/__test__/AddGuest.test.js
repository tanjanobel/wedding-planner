import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import AddGuest from "../AddGuest";

describe('Add guest page', () => {

  test('Renders addGuest',() => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    const h1 = 'Gast hinzufügen';
    expect(h1).toMatch(/Gast hinzufügen/);
  });

  test('renders save link', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
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
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    const cancelLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(cancelLink[0].textContent).toEqual('Abbrechen');
    expect(cancelLink[0].href).toContain('/guests');
  });

  test('should correctly set default option', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByRole('option', {name: 'Ausstehend'}).selected).toBe(true);
  });

  test('should display the correct number of options', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    expect(screen.getAllByRole('option').length).toBe(3);
  });

  test('should allow user to change status', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', {name: 'Zusage'}),
    )
    expect(screen.getByRole('option', {name: 'Zusage'}).selected).toBe(true);
  });

  test('Firstname input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    const firstnameInput = screen.getByLabelText('Vorname (Pflichtfeld)');
    const testValue = 'test';
    fireEvent.change(firstnameInput, {target: {value: testValue}});
    expect(firstnameInput.value).toBe(testValue);
  });

  test('Street input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <AddGuest />
        </AuthProvider>
      </Router>
    );
    const streetInput = screen.getByLabelText('Strasse');
    const testValue = 'test';
    fireEvent.change(streetInput, {target: {value: testValue}});
    expect(streetInput.value).toBe(testValue);
  });
});
