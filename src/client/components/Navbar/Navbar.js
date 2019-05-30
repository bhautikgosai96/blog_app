import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <>
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/posts">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutMe">
                About Me
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;
