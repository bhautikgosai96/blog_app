import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PostConsumer } from "../context";

export default () => {
  return (
    <PostConsumer>
      {value => {
        return (
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul className="navbar-nav">
              <li className="nav-item">
                <img
                  src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png"
                  className="App-logo"
                  height="40"
                  width="40"
                  alt="logo"
                />
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={() => {
                    value.setActivePage(1, "home", "Home", 1);
                  }}
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        );
      }}
    </PostConsumer>
  );
};
