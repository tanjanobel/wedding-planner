import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Nav from "../Nav";
import userEvent from "@testing-library/user-event";

describe('Nav Component', () => {

  test('renders nav',() => {
    render(
      <Router>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </Router>
    );
  });

  test('renders main navigation items', () => {
    render(
      <Router>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </Router>
    );
    const mainNav = screen.getAllByRole('listitem');
    expect(mainNav.length).toBe(6);
  });

  test('renders login link', () => {
    render(
      <Router>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </Router>
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[5].textContent).toEqual('Anmelden');
    expect(links[5].href).toContain('/login');
  });

  test('check mobile nav toggle', () => {
    render(
      <Router>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </Router>
    );
    const toggle = screen.getByTestId('menuToggle');
    userEvent.click(toggle);
    expect(toggle).toBeChecked();
  });
});
