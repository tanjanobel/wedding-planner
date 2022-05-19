import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Impressum from "../Impressum";

describe('Impressum page', () => {

  test('renders impressum',() => {
    render(
      <Router>
        <Impressum />
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <Impressum />
      </Router>
    );
    const h1 = 'Impressum';
    expect(h1).toMatch(/Impressum/);
  });
});
