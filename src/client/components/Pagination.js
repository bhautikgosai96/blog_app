import React, { Component } from "react";
import { PostConsumer } from "../context";
import { Link } from "react-router-dom";

class Pagination extends Component {
  constructor(porps) {
    super(porps);
  }
  render() {
    return (
      <div>
        <PostConsumer>
          {value => {
            let pp;
            let actpg;
            let pageRoute = "";
            if (this.props.pageNmae == "category") {
              pp = this.props.category;
              actpg = value.activePage;
              pageRoute = "/category/";
              console.log("in category");
            } else {
              pp = value.post;
              actpg = value.activePage;
              if (this.props.activePage) {
                actpg = this.props.activePage;
              } else {
                actpg = value.activePage;
              }
              pageRoute = "/";
              console.log("in post");
            }

            const totalPage = Math.ceil(pp.length / 10);
            let pageNext = "page-item";
            let pagePrev = "page-item";
            if (actpg < totalPage) {
              pageNext = "page-item";
            } else {
              pageNext = "page-item disabled";
            }
            if (actpg > 1) {
              pagePrev = "page-item";
            } else {
              pagePrev = "page-item disabled";
            }
            const pageArray = [];
            for (let i = 1; i <= totalPage; i++) {
              pageArray.push(i);
            }

            return (
              <div>
                <ul className="pagination" style={{ marginLeft: "40%" }}>
                  <li className={pagePrev}>
                    <Link
                      to={pageRoute + `${parseInt(actpg) - 1}`}
                      className="page-link"
                      id="prev"
                      onClick={() => {
                        value.setActivePage(parseInt(actpg), "prev");
                      }}
                    >
                      Prev
                    </Link>
                  </li>
                  {pageArray.map(number => {
                    return parseInt(actpg) === parseInt(number) ? (
                      <li className="page-item active" key={number} id={number}>
                        <Link
                          to={pageRoute + `${number}`}
                          className="page-link"
                          onClick={() => {
                            value.setActivePage(number, "normal");
                          }}
                        >
                          {number}
                        </Link>
                      </li>
                    ) : (
                      <li className="page-item" key={number} id={number}>
                        <Link
                          to={pageRoute + `${number}`}
                          className="page-link"
                          onClick={() => {
                            value.setActivePage(number, "normal");
                          }}
                        >
                          {number}
                        </Link>
                      </li>
                    );
                  })}
                  <li className={pageNext}>
                    <Link
                      to={pageRoute + `${parseInt(actpg) + 1}`}
                      className="page-link disabled"
                      onClick={() => {
                        value.setActivePage(parseInt(actpg), "next");
                      }}
                    >
                      Next
                    </Link>
                  </li>
                </ul>
              </div>
            );
          }}
        </PostConsumer>
      </div>
    );
  }
}

export default Pagination;
