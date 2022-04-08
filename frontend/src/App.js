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

function App() {
  return (
    <>
      <Header/>
      <main className="main">
        <section className="section">
          <div className="section__container container medium">
            <Routes>
              <Route index element={<Dashboard/>}/>
              <Route path="/tasks" element={<Tasks/>}/>
              <Route path="/tasks/add" element={<AddTask/>}/>
              <Route path="/tasks/:id" element={<EditTask/>}/>
              <Route path="/tasks/delete/:id" element={<DeleteTask/>}/>
              <Route path="/guests" element={<Guests/>}/>
              <Route path="/budget" element={<Budget/>}/>
              <Route path="/wedding" element={<Wedding/>}/>
              <Route path="/impressum" element={<Impressum/>}/>
              <Route path="/datenschutz" element={<Datenschutz/>}/>
            </Routes>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default App;
