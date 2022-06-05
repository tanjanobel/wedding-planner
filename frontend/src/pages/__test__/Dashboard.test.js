import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Dashboard from "../dashboard/Dashboard";

describe("Dashboard page", () => {
  test("Renders dashboard", () => {
    render(
      <Router>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </Router>
    );
  });

  test("Renders h1", () => {
    render(
      <Router>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </Router>
    );
    const h1 = "Plane deine Hochzeit online";
    expect(h1).toMatch(/deine Hochzeit/);
  });
});
