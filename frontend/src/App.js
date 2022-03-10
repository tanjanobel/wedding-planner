import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Guests from "./pages/Guests";
import Budget from "./pages/Budget";
import Wedding from "./pages/Wedding";
import Tasks from "./pages/Tasks";
import Datenschutz from "./pages/Datenschutz";
import Impressum from "./pages/Impressum";
import AddTask from "./components/tasks/AddTask";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="tasks/add" element={<AddTask />} />
            <Route path="guests" element={<Guests />} />
            <Route path="budget" element={<Budget />} />
            <Route path="wedding" element={<Wedding />} />
            <Route path="impressum" element={<Impressum />} />
            <Route path="datenschutz" element={<Datenschutz />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
