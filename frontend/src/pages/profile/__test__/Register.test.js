import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import Register from "../Register";

describe("Register Component", () => {
  test("renders register", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
  });

  test("Renders h1", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
    const h1 = "Registrieren";
    expect(h1).toMatch(/Registrieren/);
  });

  test("renders email input", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
    const emailInput = screen.getByLabelText("E-Mail Adresse (Pflichtfeld)");
    expect(emailInput).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
    const passwordInput = screen.getByLabelText("Passwort (Pflichtfeld)");
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders button", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
    const submitButton = screen.getByRole("button");
    expect(submitButton).toBeInTheDocument();
  });

  test("email input should change", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
    const emailInput = screen.getByLabelText("E-Mail Adresse (Pflichtfeld)");
    const testValue = "test@test.com";
    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
  });

  test("password input should change", () => {
    render(
      <Router>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </Router>
    );
    const passwordInput = screen.getByLabelText("Passwort (Pflichtfeld)");
    const testValue = "12345678!";
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe(testValue);
  });
});
