import React from "react";
import {Routes, Route} from "react-router-dom";
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

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
        <Route path="/tasks/add" element={<AddTask/>}/>
        <Route path="/tasks/edit/:id" element={<EditTask/>}/>
        <Route path="/tasks/delete/:id" element={<DeleteTask/>}/>
        <Route path="/guests" element={<Guests/>}/>
        <Route path="/guests/add" element={<AddGuest/>}/>
        <Route path="/guests/edit/:id" element={<EditGuest/>}/>
        <Route path="/guests/delete/:id" element={<DeleteGuest/>}/>
        <Route path="/budget" element={<Budget/>}/>
        <Route path="/wedding" element={<Wedding/>}/>
        <Route path="/impressum" element={<Impressum/>}/>
        <Route path="/datenschutz" element={<Datenschutz/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
