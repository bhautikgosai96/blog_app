import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/Home";
import { PostProvider } from "./context";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

ReactDOM.hydrate(
  <PostProvider posts={window.__INITIAL_DATA__}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </PostProvider>,
  document.querySelector("#root")
);
