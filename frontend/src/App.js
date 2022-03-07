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
        <section className="section">
          <div className="section__container container medium">
            <Task />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
