import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

function Index() {
  return (
    <>
      {/* Check for login before routing anywhere and if not login then redirect to respective login page */}
      <Link to="/">
        <button>CustomerLink</button>
      </Link>
      <Header />
      Admin Index Page
      <Footer />
    </>
  );
}

export default Index;
