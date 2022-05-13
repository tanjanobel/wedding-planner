import {getByText, render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/profile/Login";

describe('Dashboard', () => {
  test('renders an h1', () => {
    const {getByText} = render(<Dashboard />);
    const h1 = getByText(/Plane deine Hochzeit online/);

    expect(h1).toHaveTextContent('Plane deine Hochzeit online');
  })
});

describe('Header', () => {
  test('Should render header', () => {
    render(<Router><Header /></Router>);
  })
});

describe('Footer', () => {
  test('Should render footer',() => {
    render(<Router><Footer /></Router>);
  })
});

describe('Sign in form', () => {
  test('Renders sing in form',() => {
    render(<Router><Login /></Router>);

    expect(screen.getByText('Login').toHaveAttribute('type', 'submit'));
  })
});
