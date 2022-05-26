import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import App from "../App";

describe("App", () => {
  test("renders app", () => {
    render(
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    );
  });
});
