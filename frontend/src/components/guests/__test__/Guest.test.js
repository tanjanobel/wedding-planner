import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../../context/AuthContext";
import Guest from "../Guest";

describe('Guest', () => {

  test('Renders Guest',() => {
    render(
      <Router>
        <AuthProvider>
          <Guest />
        </AuthProvider>
      </Router>
    );
  });

  test('renders delete link', () => {
    render(
      <Router>
        <AuthProvider>
          <Guest />
        </AuthProvider>
      </Router>
    );
    const deleteLink: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(deleteLink[0].textContent).toEqual('Löschen');
  });
});
