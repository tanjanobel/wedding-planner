import {fireEvent, render, screen} from "@testing-library/react";
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

  test('renders username input', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const usernameInput = screen.getByLabelText('E-Mail Adresse');
    expect(usernameInput).toBeInTheDocument();
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

  test('renders button', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  test('username input should change', () => {
    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );
    const usernameInput = screen.getByLabelText('E-Mail Adresse');
    const testValue = 'test';
    fireEvent.change(usernameInput, {target: {value: testValue}});
    expect(usernameInput.value).toBe(testValue);
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
    const testValue = 'test';
    fireEvent.change(passwordInput, {target: {value: testValue}});
    expect(passwordInput.value).toBe(testValue);
  });
});
