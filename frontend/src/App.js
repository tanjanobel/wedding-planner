import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import Guests from "./pages/Guests";
import Budget from "./pages/Budget";
import Wedding from "./pages/Wedding";
import Tasks from "./pages/Tasks";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import DeleteTask from "./pages/DeleteTask";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddGuest from "./pages/AddGuest";
import EditGuest from "./pages/EditGuest";
import DeleteGuest from "./pages/DeleteGuest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/*" element={<PageNotFound />} />

          {/* Private Routes */}
          <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="/tasks/add" element={<PrivateRoute><AddTask /></PrivateRoute>} />
          <Route path="/tasks/edit/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
          <Route path="/tasks/delete/:id" element={<PrivateRoute><DeleteTask /></PrivateRoute>} />
          <Route path="/guests" element={<PrivateRoute><Guests /></PrivateRoute>} />
          <Route path="/guests/add" element={<PrivateRoute><AddGuest /></PrivateRoute>} />
          <Route path="/guests/edit/:id" element={<PrivateRoute><EditGuest /></PrivateRoute>} />
          <Route path="/guests/delete/:id" element={<PrivateRoute><DeleteGuest /></PrivateRoute>} />
          <Route path="/budget" element={<PrivateRoute><Budget /></PrivateRoute>} />
          <Route path="/budget/add" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
          <Route path="/budget/edit/:id" element={<PrivateRoute><EditExpense /></PrivateRoute>} />
          <Route path="/wedding" element={<PrivateRoute><Wedding /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
