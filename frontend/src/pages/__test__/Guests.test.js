import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Guests from "../Guests";
import Guest from "../../components/guests/Guest";

describe('Guests page', () => {

  test('Renders guests',() => {
    render(
      <Router>
        <AuthProvider>
          <Guests />
        </AuthProvider>
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <AuthProvider>
          <Guests />
        </AuthProvider>
      </Router>
    );
    const h1 = 'Meine Gästeliste';
    expect(h1).toMatch(/Meine Gästeliste/);
  });

  test('renders h3 guests pending', () => {
    render(
      <Router>
        <AuthProvider>
          <Guests />
        </AuthProvider>
      </Router>
    );
    const h3 = 'Ausstehend';
    expect(h3).toMatch('Ausstehend');
  });

  test('renders h3 guests confirmed', () => {
    render(
      <Router>
        <AuthProvider>
          <Guests />
        </AuthProvider>
      </Router>
    );
    const h3 = 'Zusagen';
    expect(h3).toMatch('Zusagen');
  });

  test('renders h3 guests cancelled', () => {
    render(
      <Router>
        <AuthProvider>
          <Guests />
        </AuthProvider>
      </Router>
    );
    const h3 = 'Absagen';
    expect(h3).toMatch('Absagen');
  });

  test('renders add guest link', () => {
    render(
      <Router>
        <AuthProvider>
          <Guests />
        </AuthProvider>
      </Router>
    );
    const addGuestLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(addGuestLink[0].textContent).toEqual('Gast hinzufügen');
    expect(addGuestLink[0].href).toContain('/guests/add');
  });

  test('Renders guest component',() => {
    render(
      <Router>
        <AuthProvider>
          <Guests>
            <Guest />
          </Guests>
        </AuthProvider>
      </Router>
    );
  });
});
