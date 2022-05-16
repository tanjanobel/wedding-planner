import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import Header from "../Header";

describe('Header Component', () => {

  test('renders header',() => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
  })

  test('renders slogan', () => {
    render(
      <Router>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </Router>
    );
    const slogan = screen.getByText(/Happily ever after.../);
    expect(slogan).toHaveTextContent("Happily ever after...");
  })
});
