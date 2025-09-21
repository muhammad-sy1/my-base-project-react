import React from "react";
import Navbar from "../elements/Navbar";
import  Footer  from "../elements/Footer";
import { Outlet } from "react-router";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
