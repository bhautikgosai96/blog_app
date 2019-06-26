import React, { Component } from "react";
import { PostConsumer } from "../context";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      isLoaded: false
    };
  }

  render() {
    return (
      <React.Fragment>
        <PostConsumer>
          {value => {
            let temp = value.post;
            let link;

            temp.map(posts => {
              link = posts.excerpt.rendered;
              let linkArray = link.split("<div>");
              posts["excerpt"]["rendered"] = linkArray[0];
            });

            if (value.isLoading) {
              return <h3>Loading.....</h3>;
            } else {
              return (
                <div>
                  {}
                  <Row className="justify-content-md">
                    {temp.map(posts => {
                      return (
                        <Col key={posts.id} md="auto">
                          <Card
                            bg="secondary"
                            text="white"
                            style={{ width: "18rem" }}
                          >
                            <Card.Header
                              dangerouslySetInnerHTML={{
                                __html: posts.title.rendered
                              }}
                            />
                            <Card.Body>
                              <Card.Title
                                dangerouslySetInnerHTML={{
                                  __html: posts.excerpt.rendered
                                }}
                              />
                              <Card.Text>
                                <Link to={`/fullPost/${posts.id}`}>
                                  Full Post
                                </Link>
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                              <p>
                                <span style={{ color: "white" }}>
                                  {" "}
                                  Category:-
                                </span>

                                {posts._embedded["wp:term"][0].map(name => {
                                  return (
                                    <Link
                                      to={`/category/${name.id}/1`}
                                      onClick={() => {
                                        value.setCategory(name.id);
                                      }}
                                    >
                                      {name.name}
                                    </Link>
                                  );
                                })}
                              </p>{" "}
                            </Card.Footer>
                          </Card>
                          <br />
                        </Col>
                      );
                    })}
                  </Row>

                  <Pagination
                    category={this.state.category}
                    pageName="category"
                  />
                </div>
              );
            }
          }}
        </PostConsumer>
      </React.Fragment>
    );
  }
}
export default Home;
