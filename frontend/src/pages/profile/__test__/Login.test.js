import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import Login from "../Login";

describe('Login Component', () => {

  test('renders login',() => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const h1 = 'Anmelden';
    expect(h1).toMatch(/Anmelden/);
  });

  test('renders email input', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const emailInput = screen.getByLabelText('E-Mail Adresse');
    expect(emailInput).toBeInTheDocument();
  });

  test('renders password input', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const passwordInput = screen.getByLabelText('Passwort');
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders login button', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const loginLink = screen.getByRole('button');
    expect(loginLink).toBeInTheDocument();
  });

  test('renders register now link', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const registerNowLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(registerNowLink[0].textContent).toEqual('Jetzt registrieren');
    expect(registerNowLink[0].href).toContain('/register');
  });

  test('email input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const emailInput = screen.getByLabelText('E-Mail Adresse');
    const testValue = 'test@test.com';
    fireEvent.change(emailInput, {target: {value: testValue}});
    expect(emailInput.value).toBe(testValue);
  });

  test('password input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const passwordInput = screen.getByLabelText('Passwort');
    const testValue = '12345678!';
    fireEvent.change(passwordInput, {target: {value: testValue}});
    expect(passwordInput.value).toBe(testValue);
  });
});
