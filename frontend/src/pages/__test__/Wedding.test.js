import {render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Wedding from "../Wedding";

describe('Wedding page', () => {

  test('Renders wedding',() => {
    render(
      <Router>
        <AuthProvider>
          <Wedding />
        </AuthProvider>
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <AuthProvider>
          <Wedding />
        </AuthProvider>
      </Router>
    );
    const h1 = 'Meine Hochzeit';
    expect(h1).toMatch(/Meine Hochzeit/);
  });
});
