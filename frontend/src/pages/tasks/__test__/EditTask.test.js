import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import EditTask from "../EditTask";

describe("Edit task page", () => {
  test("Renders editTask", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
  });

  test("Renders h1", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    const h1 = "Aufgabe bearbeiten";
    expect(h1).toMatch(/Aufgabe bearbeiten/);
  });

  test("renders save link", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    const saveLink: HTMLAnchorElement[] = screen.getAllByRole("button");
    expect(saveLink[0].textContent).toEqual("Speichern");
  });

  test("renders cancel link", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    const cancelLink: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(cancelLink[0].textContent).toEqual("Abbrechen");
    expect(cancelLink[0].href).toContain("/tasks");
  });

  test("should correctly set default option", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    expect(screen.getByRole("option", { name: "Offen" }).selected).toBe(true);
  });

  test("should display the correct number of options", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    expect(screen.getAllByRole("option").length).toBe(3);
  });

  test("should allow user to change status", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    userEvent.selectOptions(screen.getByRole("combobox"), screen.getByRole("option", { name: "In Arbeit" }));
    expect(screen.getByRole("option", { name: "In Arbeit" }).selected).toBe(true);
  });

  test("Title input should change", () => {
    render(
      <Router>
        <AuthProvider>
          <EditTask />
        </AuthProvider>
      </Router>
    );
    const titleInput = screen.getByLabelText("Titel (Pflichtfeld)");
    const testValue = "test";
    fireEvent.change(titleInput, { target: { value: testValue } });
    expect(titleInput.value).toBe(testValue);
  });
});
