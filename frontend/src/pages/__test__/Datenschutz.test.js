import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Datenschutz from "../privacy/Datenschutz";

describe("Datenschutz page", () => {
  test("renders datenschutz", () => {
    render(
      <Router>
        <Datenschutz />
      </Router>
    );
  });

  test("Renders h1", () => {
    render(
      <Router>
        <Datenschutz />
      </Router>
    );
    const h1 = "Datenschutz";
    expect(h1).toMatch(/Datenschutz/);
  });
});
