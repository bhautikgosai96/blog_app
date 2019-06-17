import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <>
        <nav class="navbar navbar-expand-sm bg-dark navbar-dark bg-faded">
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
              <h6
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  paddingTop: "3%",
                  paddingLeft: "1%"
                }}
              >
                Developed By Bhautik
              </h6>
            </li>
          </ul>
        </nav>

        {/* <h4 style={{ marginTop: "2%", marginLeft: "1%" }}>
          Develop By:- Bhautik Gosai
        </h4> */}
      </>
    );
  }
}

export default Footer;
