import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import FullPost from "./components/FullPost";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from "./components/Category";
export default () => {
  return (
    <React.Fragment>
      <Navbar />
      <div style={{ minHeight: "387px" }}>
        <Route exact path="/:pageNumber" component={Home} />
        <Route exact path="/fullPost/:id" component={FullPost} />
        <Route exact path="/category/:categoryId" component={Category} />
        <Route exact path="/" component={Home} />
      </div>

      <Footer />
    </React.Fragment>
  );
};
