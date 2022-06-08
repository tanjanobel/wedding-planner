import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "../Footer";

describe("Footer Component", () => {
  test("renders footer", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

  test("renders copyright", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const copyright = screen.getByText(/© 2022 Wedding Planner/);
    expect(copyright).toHaveTextContent("©");
  });

  test("renders meta navigation", () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    const metaNav = screen.getAllByRole("listitem");
    expect(metaNav.length).toBe(2);
  });
});
