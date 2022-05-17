import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Header from "../Header";
import Nav from "../Nav";

describe('Header Component', () => {

  test('renders header',() => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
  });

  test('renders slogan', () => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
    const slogan = screen.getByText(/Happily ever after.../);
    expect(slogan).toHaveTextContent('Happily ever after...');
  });

  test('renders login link', () => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
    const loginLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(loginLink[0].textContent).toEqual('Anmelden');
    expect(loginLink[0].href).toContain('/login');
  });

  test('renders logo', () => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
    const logo = screen.getByRole('img');
    expect(logo).toHaveAttribute('src', 'logo.svg');
    expect(logo).toHaveAttribute('alt', 'Wedding Planner');
  });
});
