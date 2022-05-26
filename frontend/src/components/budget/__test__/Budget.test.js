import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import Budget from "../Budget";

describe("Budget", () => {
  test("Renders Budget", () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
  });

  test("renders delete link", () => {
    render(
      <Router>
        <AuthProvider>
          <Budget />
        </AuthProvider>
      </Router>
    );
    const deleteLink: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(deleteLink[0].textContent).toEqual("Löschen");
  });
});
