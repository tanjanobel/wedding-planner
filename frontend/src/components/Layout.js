import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import React from "react";

const Layout = () => {
  return (
    <>
      <Header/>
      <main className="main">
        <section className="section">
          <div className="section__container container medium">
            <Outlet/>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  )
}

export default Layout;
