import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PageNotFound from "../PageNotFound";

describe('404 page', () => {

  test('renders 404',() => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
  });

  test('Renders h1', () => {
    render(
      <Router>
        <PageNotFound />
      </Router>
    );
    const h1 = 'Diese Seite existiert leider nicht';
    expect(h1).toMatch(/Diese Seite existiert leider nicht/);
  });
});
