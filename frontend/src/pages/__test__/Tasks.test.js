import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Tasks from "../tasks/Tasks";
import Task from "../../components/tasks/Task";

describe("Tasks page", () => {
  test("Renders tasks", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </Router>
    );
  });

  test("Renders h1", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </Router>
    );
    const h1 = "Meine Aufgaben";
    expect(h1).toMatch(/Meine Aufgaben/);
  });

  test("renders h3 tasks open", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </Router>
    );
    const h3 = "Offen";
    expect(h3).toMatch("Offen");
  });

  test("renders h3 tasks in progress", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </Router>
    );
    const h3 = "In Arbeit";
    expect(h3).toMatch("In Arbeit");
  });

  test("renders h3 tasks done", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </Router>
    );
    const h3 = "Erledigt";
    expect(h3).toMatch("Erledigt");
  });

  test("renders add task link", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks />
        </AuthProvider>
      </Router>
    );
    const addTaskLink: HTMLAnchorElement[] = screen.getAllByRole("link");
    expect(addTaskLink[0].textContent).toEqual("Aufgabe hinzufügen");
    expect(addTaskLink[0].href).toContain("/tasks/add");
  });

  test("Renders task component", () => {
    render(
      <Router>
        <AuthProvider>
          <Tasks>
            <Task />
          </Tasks>
        </AuthProvider>
      </Router>
    );
  });
});
