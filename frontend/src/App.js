import React from 'react';
import './App.scss';
import Header from "./components/Header";
import Task from "./components/tasks/Task";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <Task />
      </main>
      <Footer />
    </>
  );
}

export default App;
