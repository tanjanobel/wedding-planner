import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import Task from "../Task";

describe('Task', () => {

  test('Renders Task',() => {
    render(
      <Router>
        <AuthProvider>
          <Task />
        </AuthProvider>
      </Router>
    );
  });

  test('renders delete link', () => {
    render(
      <Router>
        <AuthProvider>
          <Task />
        </AuthProvider>
      </Router>
    );
    const deleteLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(deleteLink[0].textContent).toEqual('Löschen');
  });
});
